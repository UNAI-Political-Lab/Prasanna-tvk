import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import logoImg from '../assets/logo.png'

/**
 * Format date string for display
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  try {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return dateStr
  }
}

/**
 * Robust Category Code & Name resolver for new and existing grievances
 */
export const getCategoryCodeAndName = (item) => {
  if (item?.complaint_categories?.category_code) {
    return {
      code: item.complaint_categories.category_code,
      name: item.complaint_categories.name_en
    }
  }
  const titleOrCat = (item?.complaint_categories?.name_en || item?.title || '').trim()
  const match = titleOrCat.match(/^([A-H])\s*-\s*(.*)/)
  if (match) {
    return { code: match[1], name: titleOrCat }
  }

  // Smart fallback mapping for legacy database records
  const lower = titleOrCat.toLowerCase()
  if (lower.includes('road') || lower.includes('corporation')) return { code: 'A', name: 'A - Corporation Complaint / Roads' }
  if (lower.includes('eb') || lower.includes('electric')) return { code: 'B', name: 'B - Electricity Board (EB)' }
  if (lower.includes('water') || lower.includes('seawage') || lower.includes('drain')) return { code: 'C', name: 'C - Metro Water / Drainage' }
  if (lower.includes('forest') || lower.includes('ramsar') || lower.includes('palikaranai')) return { code: 'E', name: 'E - Forest & Environment [Pallikaranai, RAMSAR]' }
  if (lower.includes('patta')) return { code: 'F', name: 'F - PATTA & Land Revenue' }
  if (lower.includes('help') || lower.includes('donation') || lower.includes('rural')) return { code: 'G', name: 'G - Welfare Help & Donations' }
  if (lower.includes('storm')) return { code: 'H', name: 'H - Storm Water Drainage' }
  
  return { code: 'D', name: titleOrCat ? `D - ${titleOrCat}` : 'D - Civil Works & General Issues' }
}

/**
 * Load remote/local image URL as Base64 data URL for embedding in jsPDF
 */
let logoBase64Cache = null
const loadImageAsBase64 = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve(null)
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || 600
        canvas.height = img.naturalHeight || 400
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve({
          dataUrl: canvas.toDataURL('image/png', 0.9),
          width: canvas.width,
          height: canvas.height
        })
      } catch (e) {
        console.warn('Canvas export failed:', e)
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = url
  })
}

const getLogoBase64 = async () => {
  if (logoBase64Cache) return logoBase64Cache
  logoBase64Cache = await loadImageAsBase64(logoImg)
  return logoBase64Cache
}

/**
 * Helper to render high-contrast TVK Logo Badge preserving native aspect ratio
 */
const drawHeaderLogo = (doc, logoData, headerHeight = 36) => {
  if (!logoData) return 14

  try {
    const maxTargetH = 22 // Height in mm
    const aspect = (logoData.width && logoData.height) ? (logoData.width / logoData.height) : 2.5
    const renderW = Math.min(maxTargetH * aspect, 52)
    const renderH = renderW / aspect
    const logoY = 4 + (26 - renderH) / 2

    // White rounded card background badge for clear visibility
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(10, 4, renderW + 6, 27, 2, 2, 'F')
    doc.setLineWidth(0.3)
    doc.setDrawColor(220, 220, 220)
    doc.roundedRect(10, 4, renderW + 6, 27, 2, 2, 'D')

    // Render TVK Logo
    doc.addImage(logoData.dataUrl, 'PNG', 13, logoY, renderW, renderH)

    return 10 + renderW + 10 // Dynamic text offset
  } catch (e) {
    console.warn('Error drawing header logo:', e)
    return 14
  }
}

/**
 * Render a complete official grievance document on a jsPDF instance with TVK Logo
 */
const renderSingleGrievanceOnDoc = async (doc, item, pageNumberInfo = null, preloadedLogo = null) => {
  const { code: categoryCode, name: categoryName } = getCategoryCodeAndName(item)
  const logoData = preloadedLogo !== null ? preloadedLogo : await getLogoBase64()

  // Brand Header Bar
  doc.setFillColor(145, 9, 5) // TVK Red (#910905)
  doc.rect(0, 0, 210, 36, 'F')

  // Render TVK Logo Badge
  const textX = drawHeaderLogo(doc, logoData, 36)

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text('TAMIZHAGA VETRI KAZHAGAM', textX, 15)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Constituency Grievance Redressal Portal | Wards 188 & 189', textX, 23)

  // Title Section & Category Code Badge
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.text('OFFICIAL GRIEVANCE RECORD', 14, 48)

  // Category Code Badge (top right box)
  doc.setFillColor(145, 9, 5)
  doc.roundedRect(172, 40, 24, 16, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(categoryCode, 184, 51, { align: 'center' })

  // Summary Metadata Table
  const metaRows = [
    [
      { content: 'Reference ID:', styles: { fontStyle: 'bold' } }, item.reference_id || 'N/A',
      { content: 'Date Registered:', styles: { fontStyle: 'bold' } }, formatDate(item.created_at)
    ],
    [
      { content: 'Status:', styles: { fontStyle: 'bold' } }, (item.status || 'pending').toUpperCase(),
      { content: 'Priority:', styles: { fontStyle: 'bold' } }, (item.priority || 'medium').toUpperCase()
    ],
    [
      { content: 'Category Code & Name:', styles: { fontStyle: 'bold' } }, categoryName,
      { content: 'Ward Number:', styles: { fontStyle: 'bold' } }, item.ward_number ? `Ward ${item.ward_number}` : 'N/A'
    ]
  ]

  autoTable(doc, {
    startY: 60,
    margin: { left: 14, right: 14 },
    body: metaRows,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 38, fillColor: [248, 249, 250] },
      1: { cellWidth: 57 },
      2: { cellWidth: 38, fillColor: [248, 249, 250] },
      3: { cellWidth: 49 }
    }
  })

  let currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 90) + 8

  // Petitioner Information Section
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(145, 9, 5)
  doc.text('PETITIONER INFORMATION', 14, currentY)
  
  doc.setLineWidth(0.5)
  doc.setDrawColor(145, 9, 5)
  doc.line(14, currentY + 2, 196, currentY + 2)

  const petitionerRows = [
    [{ content: 'Full Name:', styles: { fontStyle: 'bold' } }, item.name || 'N/A',
     { content: 'Mobile Phone:', styles: { fontStyle: 'bold' } }, item.phone || 'N/A'],
    [{ content: 'Email Address:', styles: { fontStyle: 'bold' } }, item.email || 'N/A',
     { content: 'Ward Number:', styles: { fontStyle: 'bold' } }, item.ward_number ? `Ward ${item.ward_number}` : 'N/A'],
    [{ content: 'Street Name:', styles: { fontStyle: 'bold' } }, item.street || 'N/A',
     { content: 'Area / Location:', styles: { fontStyle: 'bold' } }, item.area || 'N/A']
  ]

  autoTable(doc, {
    startY: currentY + 5,
    margin: { left: 14, right: 14 },
    body: petitionerRows,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 32, fillColor: [248, 249, 250] },
      1: { cellWidth: 63 },
      2: { cellWidth: 32, fillColor: [248, 249, 250] },
      3: { cellWidth: 55 }
    }
  })

  currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY + 40) + 8

  // Grievance Details Section
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(145, 9, 5)
  doc.text('GRIEVANCE DETAILS', 14, currentY)
  doc.line(14, currentY + 2, 196, currentY + 2)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(30, 30, 30)
  doc.text(`Title: ${item.title || 'N/A'}`, 14, currentY + 9)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')

  const splitDesc = doc.splitTextToSize(item.description || 'No description provided.', 182)
  doc.text(splitDesc, 14, currentY + 16)

  currentY = currentY + 16 + (splitDesc.length * 5) + 6

  // Attachments & Embedded Media Section
  let attachments = []
  if (item.attachments) {
    if (Array.isArray(item.attachments)) {
      attachments = item.attachments
    } else {
      try { attachments = JSON.parse(item.attachments) } catch { attachments = [] }
    }
  }

  if (attachments.length > 0) {
    if (currentY > 230) {
      doc.addPage()
      currentY = 20
    }

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(145, 9, 5)
    doc.text(`ATTACHED EVIDENCE MEDIA (${attachments.length})`, 14, currentY)
    doc.line(14, currentY + 2, 196, currentY + 2)
    currentY += 8

    // Separate images vs non-images
    const imagesToLoad = []
    const otherFiles = []

    for (const att of attachments) {
      const url = att.url || att
      const name = att.name || 'Attachment'
      const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i) || att.type?.startsWith('image/')
      if (isImage) {
        imagesToLoad.push({ name, url })
      } else {
        otherFiles.push({ name, url })
      }
    }

    // Embed Image Files Directly
    if (imagesToLoad.length > 0) {
      let imageX = 14
      let maxRowHeight = 0

      for (let i = 0; i < imagesToLoad.length; i++) {
        const imgObj = imagesToLoad[i]
        const loadedImg = await loadImageAsBase64(imgObj.url)

        if (loadedImg) {
          const maxW = 82
          const maxH = 60
          let renderW = maxW
          let renderH = (loadedImg.height / loadedImg.width) * renderW

          if (renderH > maxH) {
            renderH = maxH
            renderW = (loadedImg.width / loadedImg.height) * renderH
          }

          if (currentY + renderH + 12 > 275) {
            doc.addPage()
            currentY = 20
            imageX = 14
          }

          if (imageX + renderW > 196) {
            imageX = 14
            currentY += maxRowHeight + 8
            maxRowHeight = 0
            if (currentY + renderH + 12 > 275) {
              doc.addPage()
              currentY = 20
            }
          }

          doc.setDrawColor(220, 220, 220)
          doc.setFillColor(250, 250, 250)
          doc.rect(imageX, currentY, renderW, renderH + 6, 'FD')

          try {
            doc.addImage(loadedImg.dataUrl, 'JPEG', imageX + 1, currentY + 1, renderW - 2, renderH - 2)
          } catch (err) {
            console.error('Error adding image to PDF:', err)
          }

          doc.setFontSize(7)
          doc.setTextColor(100, 100, 100)
          const truncateName = imgObj.name.length > 30 ? imgObj.name.substring(0, 27) + '...' : imgObj.name
          doc.text(truncateName, imageX + 2, currentY + renderH + 4)

          imageX += renderW + 8
          if (renderH + 6 > maxRowHeight) maxRowHeight = renderH + 6
        }
      }
      currentY += maxRowHeight + 10
    }

    if (otherFiles.length > 0) {
      if (currentY > 250) {
        doc.addPage()
        currentY = 20
      }

      const otherRows = otherFiles.map((att, i) => [
        `#${i + 1}`,
        att.name,
        att.url
      ])

      autoTable(doc, {
        startY: currentY,
        margin: { left: 14, right: 14 },
        head: [['Sl', 'Document Name', 'Media Link / URL']],
        body: otherRows,
        theme: 'striped',
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [145, 9, 5], textColor: 255 }
      })
      currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY + 30) + 10
    }
  }

  // Footer line & text
  const totalPagesInDoc = doc.internal.getNumberOfPages()
  const currentPageNo = pageNumberInfo ? pageNumberInfo.current : totalPagesInDoc
  const pageStr = pageNumberInfo ? `Document ${pageNumberInfo.docIndex} of ${pageNumberInfo.totalDocs}` : `Page ${currentPageNo} of ${totalPagesInDoc}`

  doc.setDrawColor(220, 220, 220)
  doc.line(14, 280, 196, 280)
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text(`Generated on ${new Date().toLocaleString('en-IN')} | ${pageStr}`, 14, 285)
  doc.text('TVK Grievance Redressal System', 196, 285, { align: 'right' })
}

/**
 * Download a single grievance document as a styled PDF with TVK logo & embedded images
 */
export const downloadSingleGrievancePDF = async (item) => {
  const doc = new jsPDF()
  await renderSingleGrievanceOnDoc(doc, item)
  doc.save(`Grievance_${item.reference_id || item.id}.pdf`)
}

/**
 * Bulk download grievances as a structured multi-page PDF document
 */
export const downloadBulkGrievancesPDF = async (items, filterSummary = {}) => {
  if (!items || items.length === 0) return

  const doc = new jsPDF()
  const logoData = await getLogoBase64()

  for (let i = 0; i < items.length; i++) {
    if (i > 0) {
      doc.addPage()
    }
    await renderSingleGrievanceOnDoc(doc, items[i], {
      docIndex: i + 1,
      totalDocs: items.length
    }, logoData)
  }

  doc.save(`TVK_All_Grievances_Documents_${Date.now()}.pdf`)
}

/**
 * Download a Weekly Grievances PDF Report featuring TVK Logo and executive analytics summary
 */
export const downloadWeeklyReportPDF = async (items, dateRange = {}) => {
  const doc = new jsPDF()
  const logoData = await getLogoBase64()

  // Header background bar
  doc.setFillColor(145, 9, 5) // TVK Red (#910905)
  doc.rect(0, 0, 210, 36, 'F')

  // Render TVK Logo Badge
  const textX = drawHeaderLogo(doc, logoData, 36)

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.text('TAMIZHAGA VETRI KAZHAGAM', textX, 15)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('WEEKLY CONSTITUENCY GRIEVANCES REPORT', textX, 22)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  const dateFromStr = dateRange.dateFrom ? formatDate(dateRange.dateFrom) : 'Past 7 Days'
  const dateToStr = dateRange.dateTo ? formatDate(dateRange.dateTo) : formatDate(new Date().toISOString())
  doc.text(`Period: ${dateFromStr} — ${dateToStr} | Wards 188 & 189`, textX, 28)

  // Executive Summary Box
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('EXECUTIVE SUMMARY & STATISTICAL OVERVIEW', 14, 48)

  const pendingCount = items.filter(i => i.status === 'pending').length
  const inProgressCount = items.filter(i => i.status === 'in_progress').length
  const resolvedCount = items.filter(i => i.status === 'resolved').length

  const statTableBody = [
    [
      { content: 'Total Complaints Received:', styles: { fontStyle: 'bold' } }, String(items.length),
      { content: 'Resolved Complaints:', styles: { fontStyle: 'bold' } }, String(resolvedCount)
    ],
    [
      { content: 'Pending Review:', styles: { fontStyle: 'bold' } }, String(pendingCount),
      { content: 'In Progress:', styles: { fontStyle: 'bold' } }, String(inProgressCount)
    ]
  ]

  autoTable(doc, {
    startY: 52,
    margin: { left: 14, right: 14 },
    body: statTableBody,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 45, fillColor: [248, 249, 250] },
      1: { cellWidth: 46 },
      2: { cellWidth: 45, fillColor: [248, 249, 250] },
      3: { cellWidth: 46 }
    }
  })

  let currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : 80) + 8

  // Category Breakdown Table
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(145, 9, 5)
  doc.text('CATEGORY-WISE WEEKLY BREAKDOWN (A – H)', 14, currentY)
  doc.setLineWidth(0.5)
  doc.setDrawColor(145, 9, 5)
  doc.line(14, currentY + 2, 196, currentY + 2)

  // Count items per category code A..H
  const catCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 }
  items.forEach(item => {
    const { code } = getCategoryCodeAndName(item)
    if (catCounts[code] !== undefined) catCounts[code]++
    else catCounts['D']++
  })

  const catBreakdownRows = [
    ['Code', 'Category Name', 'Weekly Count', '% of Total'],
    ['A', 'Corporation Complaint / Roads', String(catCounts.A), `${items.length > 0 ? ((catCounts.A / items.length) * 100).toFixed(1) : 0}%`],
    ['B', 'Electricity Board (EB)', String(catCounts.B), `${items.length > 0 ? ((catCounts.B / items.length) * 100).toFixed(1) : 0}%`],
    ['C', 'Metro Water / Drainage', String(catCounts.C), `${items.length > 0 ? ((catCounts.C / items.length) * 100).toFixed(1) : 0}%`],
    ['D', 'Civil Works & General Issues', String(catCounts.D), `${items.length > 0 ? ((catCounts.D / items.length) * 100).toFixed(1) : 0}%`],
    ['E', 'Forest & Environment [Pallikaranai, RAMSAR]', String(catCounts.E), `${items.length > 0 ? ((catCounts.E / items.length) * 100).toFixed(1) : 0}%`],
    ['F', 'PATTA & Land Revenue', String(catCounts.F), `${items.length > 0 ? ((catCounts.F / items.length) * 100).toFixed(1) : 0}%`],
    ['G', 'Welfare Help & Donations', String(catCounts.G), `${items.length > 0 ? ((catCounts.G / items.length) * 100).toFixed(1) : 0}%`],
    ['H', 'Storm Water Drainage', String(catCounts.H), `${items.length > 0 ? ((catCounts.H / items.length) * 100).toFixed(1) : 0}%`]
  ]

  autoTable(doc, {
    startY: currentY + 5,
    margin: { left: 14, right: 14 },
    head: [catBreakdownRows[0]],
    body: catBreakdownRows.slice(1),
    theme: 'striped',
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    headStyles: { fillColor: [145, 9, 5], textColor: 255, fontStyle: 'bold' },
    columnStyles: {
      0: { cellWidth: 16, fontStyle: 'bold', halign: 'center' },
      1: { cellWidth: 100 },
      2: { cellWidth: 32, halign: 'center' },
      3: { cellWidth: 34, halign: 'center' }
    }
  })

  // Footer for Page 1
  doc.setPage(1)
  doc.setDrawColor(220, 220, 220)
  doc.line(14, 280, 196, 280)
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text(`Generated on ${new Date().toLocaleString('en-IN')} | Page 1 Summary`, 14, 285)
  doc.text('TVK Grievance Redressal System', 196, 285, { align: 'right' })

  // Render individual grievance record pages for every grievance registered during the week
  for (let i = 0; i < items.length; i++) {
    doc.addPage()
    await renderSingleGrievanceOnDoc(doc, items[i], {
      docIndex: i + 1,
      totalDocs: items.length
    }, logoData)
  }

  doc.save(`TVK_Weekly_Grievances_Report_${Date.now()}.pdf`)
}

/**
 * Bulk download grievances as CSV file
 */
export const downloadGrievancesCSV = (items) => {
  if (!items || items.length === 0) return

  const headers = [
    'Reference ID',
    'Category Code',
    'Category Name',
    'Petitioner Name',
    'Phone',
    'Email',
    'Ward Number',
    'Street Name',
    'Area',
    'Title',
    'Description',
    'Status',
    'Priority',
    'Created At'
  ]

  const rows = items.map(item => {
    const { code, name } = getCategoryCodeAndName(item)
    return [
      item.reference_id || '',
      code,
      name,
      item.name || '',
      item.phone || '',
      item.email || '',
      item.ward_number || '',
      item.street || '',
      item.area || '',
      item.title || '',
      (item.description || '').replace(/[\r\n]+/g, ' '),
      item.status || '',
      item.priority || '',
      item.created_at || ''
    ]
  })

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `Grievances_Export_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
