import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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
  if (lower.includes('road') || lower.includes('corporation')) return { code: 'A', name: 'A - Corporation complain / Road' }
  if (lower.includes('eb') || lower.includes('electric')) return { code: 'B', name: 'B - EB' }
  if (lower.includes('water') || lower.includes('seawage') || lower.includes('drain')) return { code: 'C', name: 'C - Metro water/ drinage' }
  if (lower.includes('forest') || lower.includes('ramsar') || lower.includes('palikaranai')) return { code: 'E', name: 'E - Forest [palikaranai, RAMSAR]' }
  if (lower.includes('patta')) return { code: 'F', name: 'F - PATTA' }
  if (lower.includes('help') || lower.includes('donation') || lower.includes('rural')) return { code: 'G', name: 'G - Help/Donation' }
  if (lower.includes('storm')) return { code: 'H', name: 'H - Storm Water Drinage' }
  
  return { code: 'D', name: titleOrCat ? `D - ${titleOrCat}` : 'D - Civil/others' }
}

/**
 * Load remote image URL as Base64 data URL for embedding in jsPDF
 */
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
          dataUrl: canvas.toDataURL('image/jpeg', 0.85),
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

/**
 * Render a complete official grievance document on a jsPDF instance
 */
const renderSingleGrievanceOnDoc = async (doc, item, pageNumberInfo = null) => {
  const { code: categoryCode, name: categoryName } = getCategoryCodeAndName(item)

  // Brand Header Bar
  doc.setFillColor(145, 9, 5) // TVK Red (#910905)
  doc.rect(0, 0, 210, 32, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text('TAMIZHAGA VETRI KAZHAGAM', 14, 15)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Constituency Grievance Redressal Portal | Wards 188 & 189', 14, 23)

  // Title Section & Category Code Badge
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('OFFICIAL GRIEVANCE RECORD', 14, 45)

  // Category Code Badge (top right box)
  doc.setFillColor(145, 9, 5)
  doc.roundedRect(172, 38, 24, 16, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text(categoryCode, 184, 49, { align: 'center' })

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
    startY: 58,
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
          // Calculate proportional width & height (max width 80mm, max height 60mm)
          const maxW = 82
          const maxH = 60
          let renderW = maxW
          let renderH = (loadedImg.height / loadedImg.width) * renderW

          if (renderH > maxH) {
            renderH = maxH
            renderW = (loadedImg.width / loadedImg.height) * renderH
          }

          // Page break check if image doesn't fit on page
          if (currentY + renderH + 12 > 275) {
            doc.addPage()
            currentY = 20
            imageX = 14
          }

          // If side-by-side fits on same line
          if (imageX + renderW > 196) {
            imageX = 14
            currentY += maxRowHeight + 8
            maxRowHeight = 0
            if (currentY + renderH + 12 > 275) {
              doc.addPage()
              currentY = 20
            }
          }

          // Draw Image Frame & Base64 Image
          doc.setDrawColor(220, 220, 220)
          doc.setFillColor(250, 250, 250)
          doc.rect(imageX, currentY, renderW, renderH + 6, 'FD')

          try {
            doc.addImage(loadedImg.dataUrl, 'JPEG', imageX + 1, currentY + 1, renderW - 2, renderH - 2)
          } catch (err) {
            console.error('Error adding image to PDF:', err)
          }

          // Image Caption/Name
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

    // Other non-image files table
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
 * Download a single grievance document as a styled PDF with embedded images
 */
export const downloadSingleGrievancePDF = async (item) => {
  const doc = new jsPDF()
  await renderSingleGrievanceOnDoc(doc, item)
  doc.save(`Grievance_${item.reference_id || item.id}.pdf`)
}

/**
 * Bulk download grievances as a structured multi-page PDF document
 * where EACH grievance is rendered as a FULL OFFICIAL DOCUMENT PAGE with embedded photos!
 */
export const downloadBulkGrievancesPDF = async (items, filterSummary = {}) => {
  if (!items || items.length === 0) return

  const doc = new jsPDF()

  for (let i = 0; i < items.length; i++) {
    if (i > 0) {
      doc.addPage()
    }
    await renderSingleGrievanceOnDoc(doc, items[i], {
      docIndex: i + 1,
      totalDocs: items.length
    })
  }

  doc.save(`TVK_All_Grievances_Documents_${Date.now()}.pdf`)
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
