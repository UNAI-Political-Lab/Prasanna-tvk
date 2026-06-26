import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 200, 
      headers: corsHeaders 
    })
  }

  let supabaseAdmin: any = null
  let payload: any = {}
  let grievance_id: string | null = null
  let reference_id: string | null = null
  let formattedToWhatsApp: string = 'unknown'

  // 1. Initialize Supabase Admin safely
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (supabaseUrl && supabaseServiceRoleKey) {
      supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
    } else {
      console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing from Deno environment.')
    }
  } catch (initErr) {
    console.error('Uncaught error during Supabase Client initialization:', initErr)
  }

  // Helper to log notifications to the database
  const logNotification = async (status: 'success' | 'failed', responsePayload: any, errorMessage: string | null = null) => {
    try {
      if (supabaseAdmin) {
        await supabaseAdmin.from('notification_logs').insert({
          grievance_id: grievance_id || null,
          reference_id: reference_id || null,
          recipient: formattedToWhatsApp,
          status: status,
          response_payload: responsePayload,
          error_message: errorMessage
        })
      }
    } catch (dbErr) {
      console.error('Failed to insert log entry into notification_logs table:', dbErr)
    }
  }

  try {
    // 2. Parse request payload safely
    try {
      payload = await req.json()
      grievance_id = payload.id
      reference_id = payload.reference_id
    } catch (parseErr) {
      console.error('Failed to parse request JSON payload:', parseErr)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body payload.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { name, phone, area, category, title, description } = payload

    // Retrieve Twilio Environment Variables
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID')
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN')
    let fromWhatsApp = Deno.env.get('TWILIO_WHATSAPP_FROM')
    let toWhatsApp = Deno.env.get('NOTIFICATION_WHATSAPP_TO')

    if (!accountSid || !authToken || !fromWhatsApp || !toWhatsApp) {
      const errorMsg = 'Missing Twilio credentials or target numbers in Deno secrets.'
      console.error(errorMsg)
      
      // Log config failure to database
      await logNotification('failed', { error: 'config_missing' }, errorMsg)

      return new Response(
        JSON.stringify({ error: errorMsg }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // --- ROBUST TWILIO PHONE NUMBER FORMATTING ---
    // 1. Format "From" number
    let cleanFrom = fromWhatsApp.trim()
    if (cleanFrom.startsWith('whatsapp:')) {
      cleanFrom = cleanFrom.replace('whatsapp:', '').trim()
    }
    if (!cleanFrom.startsWith('+')) {
      cleanFrom = `+${cleanFrom}`
    }
    fromWhatsApp = `whatsapp:${cleanFrom}`

    // 2. Format "To" number
    let cleanTo = toWhatsApp.trim()
    if (cleanTo.startsWith('whatsapp:')) {
      cleanTo = cleanTo.replace('whatsapp:', '').trim()
    }
    if (!cleanTo.startsWith('+')) {
      // Default to +91 (India) if no country code is provided
      cleanTo = `+91${cleanTo}`
    }
    formattedToWhatsApp = `whatsapp:${cleanTo}`
    // ---------------------------------------------

    // Construct the WhatsApp Message Template
    const messageBody = `🚨 *New Grievance Registered* 🚨\n\n` +
      `*Reference ID:* ${reference_id}\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Area:* ${area}\n` +
      `*Category:* ${category}\n` +
      `*Title:* ${title}\n` +
      `*Description:* ${description || 'N/A'}\n\n` +
      `_Submitted on TVK Political Portal._`

    // Prepare Twilio API request
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
    
    const formData = new URLSearchParams()
    formData.append('From', fromWhatsApp)
    formData.append('To', formattedToWhatsApp)
    formData.append('Body', messageBody)

    const basicAuth = btoa(`${accountSid}:${authToken}`)

    // Post to Twilio API
    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`
      },
      body: formData.toString()
    })

    const result = response.headers.get('content-type')?.includes('application/json')
      ? await response.json()
      : await response.text()

    if (!response.ok) {
      console.error('Twilio API returned HTTP error:', result)
      
      // Log Twilio API error
      await logNotification('failed', { raw: result }, typeof result === 'string' ? result : JSON.stringify(result))

      return new Response(
        JSON.stringify({ error: 'Twilio API returned error.', details: result }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log success
    await logNotification('success', result, null)

    return new Response(
      JSON.stringify({ success: true, messageSid: result.sid }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge Function crash log:', error)
    
    // Log exception details
    await logNotification('failed', { error_stack: error.stack }, error.message)

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
