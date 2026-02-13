import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportResumeToPDF(
    elementId: string,
    filename: string = "resume.pdf"
): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error("Resume element not found");
    }

    // Clone the element for PDF rendering
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = "210mm";
    clone.style.minHeight = "297mm";
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            width: 794, // A4 at 96 DPI
            height: 1123,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
    } finally {
        document.body.removeChild(clone);
    }
}

export async function exportCoverLetterToPDF(
    elementId: string,
    filename: string = "cover-letter.pdf"
): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
        throw new Error("Cover letter element not found");
    }

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
}
