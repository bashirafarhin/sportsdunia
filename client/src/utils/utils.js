// exportUtils.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";

export const exportToCSV = (articles, payoutRate) => {
  const authorMap = {};
  articles.forEach((a) => {
    const author = a.author || "Unknown";
    authorMap[author] = (authorMap[author] || 0) + 1;
  });

  const rows = Object.entries(authorMap).map(([author, count]) => ({
    Author: author,
    Articles: count,
    Payout: (count * payoutRate).toFixed(2),
  }));

  const worksheet = utils.json_to_sheet(rows);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Payout Report");
  writeFile(workbook, "payout_report.csv");
};

export const exportToPDF = (articles, payoutRate) => {
  const doc = new jsPDF();
  const authorMap = {};
  articles.forEach((a) => {
    const author = a.author || "Unknown";
    authorMap[author] = (authorMap[author] || 0) + 1;
  });

  const rows = Object.entries(authorMap).map(([author, count]) => [
    author,
    count,
    `$${(count * payoutRate).toFixed(2)}`,
  ]);

  autoTable(doc, {
    head: [["Author", "Articles", "Payout"]],
    body: rows,
  });

  doc.save("payout_report.pdf");
};