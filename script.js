document.addEventListener('DOMContentLoaded', () => {
    const aiForm = document.getElementById('ai-form');
    const productInput = document.getElementById('product-input');
    const aiResult = document.getElementById('ai-result');
    const aiLoading = document.getElementById('ai-loading');

    // Assurez-vous que c'est bien votre URL Zapier
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23129157/u37yrql/';

    if (aiForm) {
        aiForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            aiLoading.style.display = 'block';
            aiResult.textContent = '';

            try {
                // LA CORRECTION EST ICI : on envoie une requête très simple
                // sans en-tête complexe.
                const response = await fetch(zapierWebhookUrl, {
                    method: 'POST',
                    body: productInput.value // On envoie juste le texte brut, pas du JSON.
                });

                // Le reste du code ne change pas
                const resultData = await response.json();
                aiResult.textContent = JSON.stringify(resultData, null, 2);

            } catch (error) {
                aiResult.textContent = 'Une erreur est survenue lors de la requête.';
                console.error('Erreur Fetch:', error);
            } finally {
                aiLoading.style.display = 'none';
            }
        });
    } else {
        console.error("L'élément 'ai-form' n'a pas été trouvé. Vérifiez l'ID dans index.html.");
    }
});
