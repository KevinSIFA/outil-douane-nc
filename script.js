// Attend que toute la page soit chargée
document.addEventListener('DOMContentLoaded', () => {

    // --- PARTIE POUR L'ASSISTANT IA ---
    const aiForm = document.getElementById('ai-form');
    const productInput = document.getElementById('product-input');
    const aiResult = document.getElementById('ai-result');
    const aiLoading = document.getElementById('ai-loading');

    // ▼▼▼ COLLEZ L'URL DE VOTRE WEBHOOK ZAPIER CI-DESSOUS ▼▼▼
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23129157/u37yrql/'; // ⚠️ REMPLACEZ PAR VOTRE URL ZAPIER !

    aiForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche la page de se recharger

        const productDescription = productInput.value;
        if (!productDescription.trim()) {
            alert('Veuillez décrire le produit.');
            return;
        }

        aiLoading.style.display = 'block';
        aiResult.textContent = '';

        // On envoie la description au webhook Zapier
        // La méthode POST est plus robuste, mais GET fonctionne pour un texte simple
        try {
            const response = await fetch(`${zapierWebhookUrl}?description=${encodeURIComponent(productDescription)}`, {
                method: 'POST' // On utilise POST même si les données sont dans l'URL pour plus de compatibilité
            });

            if (response.ok) {
                const resultData = await response.json();
                // Adaptez "result.completion" au nom du champ que Zapier vous renvoie
                aiResult.textContent = resultData.completion || JSON.stringify(resultData, null, 2);
            } else {
                aiResult.textContent = 'Erreur lors de la communication avec le serveur.';
            }

        } catch (error) {
            aiResult.textContent = 'Une erreur est survenue.';
            console.error(error);
        } finally {
            aiLoading.style.display = 'none';
        }
    });
});
