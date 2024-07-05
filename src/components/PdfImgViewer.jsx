import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

function PdfImgViewer({ userId, vrfCode, vrfsCode }) {
    // const imgRef = useRef(null);
    const [url, setUrl] = useState(null)

    console.log("Url: ", url, vrfsCode)

    const loadPdf = async (pdfData) => {
        console.log("Load pdf: ", pdfData)
            try {
                // Initialize PDF.js
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${window.pdfjsLib.version}/pdf.worker.min.js`;

                // Load PDF document
                const loadingTask = window.pdfjsLib.getDocument({ data: pdfData });
                const pdf = await loadingTask.promise;

                // Fetch the first page
                const pageNumber = 1;
                const page = await pdf.getPage(pageNumber);

                // Set scale for rendering
                const scale = 1.5;
                const viewport = page.getViewport({ scale });

                // Prepare canvas using PDF page dimensions
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = "22rem";
                canvas.width = "22rem";

                // Render PDF page into canvas context
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                await page.render(renderContext).promise;

                // Convert canvas to base64 encoded image
                const imageDataURL = canvas.toDataURL('image/jpeg');
                setUrl(imageDataURL)
            } catch (error) {
                console.error('Error loading PDF:', pdfData);
            }
        };

    const fetchUploadedDoc = async (userId, vrfCode, vrfsCode) => {
        try{
            const res = await axios.get(`https://finle-user-service.azurewebsites.net/user-service/downloadDocument?userId=${userId}&vrfCode=${vrfCode}&vrfsCode=${vrfsCode}`)
            return res.data
        }catch(error){
            console.log("Error on fetching uploaded documemnt", error)
            alert("Error on fetching uploaded documemnt")
        }
    }

    const generateImg = useCallback( async (userId, vrfCode, vrfsCode) => {
        try{
            const pdfData = await fetchUploadedDoc(userId, vrfCode, vrfsCode)
            if(vrfsCode === "A703"){
                console.log('PDF DATA: ', pdfData)
            }
            // const blob = new Blob([pdfData], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(pdfData);
            // const base64String = Buffer.from(pdfData).toString('base64');

                // Create image data URL
                // const imageUrl = `data:image/jpeg;base64,${base64String}`;
                setUrl(imageUrl);

            // loadPdf(pdfData)
        }
        catch(error){
            console.log("Error fetching image data from server.", error)
        }
    }, [])

    console.log("URL: ", url)


    useEffect(() => {
        if(userId && vrfCode && vrfsCode){
            generateImg(userId, vrfCode, vrfsCode)
        }
    }, [userId, vrfCode, vrfsCode, generateImg]);

    return (
        <div style={{border: "2px solid grey", display: "flex", height: "22rem", width: "22rem", alignItems:'center', justifyContent: 'center' }}>
            {
                url &&
                <img src={url} alt="Uploaded document" />
            }
        </div>
    )
}

export default PdfImgViewer;
