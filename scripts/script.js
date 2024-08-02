document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        nom: formData.get('nom'),
        sexe: formData.get('sexe'),
        date_naissance: formData.get('date_naissance'),
        fils_de_pere: formData.get('fils_de_pere'),
        fils_de_mere: formData.get('fils_de_mere'),
        etat_civil: formData.get('etat_civil'),
        b_i: formData.get('b_i'),
        local_emissao: formData.get('local_emissao'),
        date_emissao: formData.get('date_emissao'),
        region: formData.get('region'),
        bairro: formData.get('bairro'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        institution: formData.get('institution'),
        formation: formData.get('formation'),
        annee: formData.get('annee'),
        
    };

    const message = `Nouvelle inscription:\nNom Complet: ${data.nom}\nSexe: ${data.sexe}\nDate de naissance: ${data.date_naissance}\nFils De Pere: ${data.fils_de_pere}\nFils De Mere: ${data.fils_de_mere}\nEtat Civil: ${data.etat_civil}\nB.I.: ${data.b_i}\nLocal d'Emission: ${data.local_emissao}\nDate d'Emission: ${data.date_emissao}\nRegion: ${data.region}\nBairro: ${data.bairro}\nEmail: ${data.email}\nTelephone: ${data.telephone}\nInstitution: ${data.institution}\nFormation: ${data.formation}\nannee: ${data.annee}\n`;
    const telegramBotToken = '7439405106:AAFcE9pZaxrpZiBMw3bc5fo9LbvfAo4Hvr4';
    const telegramChatId = '-4253030430';

    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Inscription envoyée avec succès!');
        } else {
            alert('Erreur de l\'API Telegram: ' + data.description);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'envoi de l\'inscription.');
    });
    
});
