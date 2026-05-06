export const exportToPDF = (title, data, filename) => {
  // Simple text-based PDF using browser print
  const printWindow = window.open('', '_blank');
  const content = `
    <html>
    <head><title>${title}</title>
    <style>
      body { font-family: Arial; padding: 20px; }
      h1 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background: #3b82f6; color: white; }
      .date { color: #666; font-size: 12px; }
    </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="date">Generated: ${new Date().toLocaleString()}</div>
      <table>
        <tr>${Object.keys(data[0] || {}).map(k => `<th>${k}</th>`).join('')}</tr>
        ${data.map(row => `<tr>${Object.values(row).map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
      </table>
    </body>
    </html>
  `;
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};
