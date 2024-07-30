var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const dateInput = document.getElementById('date');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    // Fonction pour générer la date actuelle
    const setCurrentDate = () => {
        const now = new Date();
        dateInput.value = now.getDate();
        monthInput.value = now.toLocaleString('default', { month: 'long' });
        yearInput.value = now.getFullYear();
    };

    // Appeler la fonction pour définir la date actuelle
    setCurrentDate();

    // Gestion de l'événement de soumission du formulaire
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Conversion du formulaire en fichier PDF
        const formData = new FormData(form);
        const pdfDoc = await generatePDF(formData);

        // Envoi du PDF par Telegram
        await sendToTelegram(pdfDoc);

        alert('Formulaire soumis avec succès !');
        form.reset();
    });

    // Fonction pour générer le PDF
    const generatePDF = async (formData) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Ajout des données du formulaire au PDF
        pdf.text("ASSOCIATION DES ETUDIANTS BISSAU-GUINÉENS AU SÉNÉGAL", 10, 10);
        pdf.text("CADASTRO DO MEMBRO", 10, 20);
        formData.forEach((value, key) => {
            pdf.text(`${key}: ${value}`, 10, 30);
        });

        return pdf.output('blob');
    };

    // Fonction pour envoyer le PDF par Telegram
    const sendToTelegram = async (pdfDoc) => {
        const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
        const chatId = 'YOUR_CHAT_ID';

        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', pdfDoc, 'formulaire.pdf');

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du PDF');
            }

            alert('Formulaire envoyé avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
        }
    };
});
