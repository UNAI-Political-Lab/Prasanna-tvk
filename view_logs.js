import fs from 'fs';

async function getLogs() {
  if (!fs.existsSync('.env')) {
    console.error('.env file not found.');
    return;
  }
  
  const envContent = fs.readFileSync('.env', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      env[key] = val;
    }
  });

  const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing URL or Key in .env file.');
    return;
  }

  const url = `${supabaseUrl}/rest/v1/notification_logs?select=*&limit=1&order=created_at.desc`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch logs:', await response.text());
      return;
    }

    const data = await response.json();
    console.log('--- LATEST NOTIFICATION LOG ---');
    data.forEach((log, index) => {
      console.log(`\n[Log #${index + 1}]`);
      console.log(`Created At: ${log.created_at}`);
      console.log(`Reference ID: ${log.reference_id}`);
      console.log(`Recipient: ${log.recipient}`);
      console.log(`Status: ${log.status}`);
      console.log(`Error Message: ${log.error_message}`);
      console.log('Response Payload:', typeof log.response_payload === 'string' ? log.response_payload : JSON.stringify(log.response_payload, null, 2));
    });

  } catch (err) {
    console.error('Request failed:', err);
  }
}

getLogs();
