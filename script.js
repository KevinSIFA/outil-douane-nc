document.addEventListener('DOMContentLoaded', () => {
    // On sélectionne les éléments de la page
    const aiForm = document.getElementById('ai-form');
    const productInput = document.getElementById('product-input');
    const aiResult = document.getElementById('ai-result');
    const aiLoading = document.getElementById('ai-loading');
    const submitButton = document.getElementById('submit-button');

    // Mettez votre URL de webhook ici
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23129157/u37yrql/'; // ⚠️ REMPLACEZ PAR VOTRE URL ZAPIER !

    // On s'assure que le formulaire existe avant d'ajouter un écouteur
    if (aiForm) {
        aiForm.addEventListener('submit', async (event) => {
            // On empêche le rechargement de la page
            event.preventDefault(); 
            
            // On affiche le chargement et on désactive le bouton
            aiLoading.style.display = 'block';
            submitButton.disabled = true;
            aiResult.textContent = '';

            try {
                // On envoie la requête à Zapier
                const response = await fetch(zapierWebhookUrl, {
                    method: 'POST',
                    body: productInput.value 
                });

                // Si la réponse n'est pas OK, on génère une erreur
                if (!response.ok) {
                    throw new Error(`Erreur du serveur: ${response.statusText}`);
                }

                // On affiche le résultat renvoyé par Zapier
                const resultData = await response.json();
                aiResult.textContent = JSON.stringify(resultData, null, 2);

            } catch (error) {
                // En cas d'erreur réseau ou autre, on l'affiche
                aiResult.textContent = `Une erreur est survenue: ${error.message}`;
                console.error('Erreur lors du fetch:', error);
            } finally {
                // Dans tous les cas, on cache le chargement et on réactive le bouton
                aiLoading.style.display = 'none';
                submitButton.disabled = false;
            }
        });
    }
});
