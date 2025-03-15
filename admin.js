document.getElementById("fileInput").addEventListener("change", processExcel);

function processExcel() {
    const file = document.getElementById("fileInput").files[0];
    if (!file) {
        alert("Please upload an Excel file!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Store results in browser storage for student access
        localStorage.setItem("studentResults", JSON.stringify(jsonData));

        alert("Results uploaded successfully!");
    };
    reader.readAsArrayBuffer(file);
}
