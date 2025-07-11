// Attend que toute la page soit chargée
document.addEventListener('DOMContentLoaded', () => {

    // --- PARTIE POUR L'ASSISTANT IA ---
    const aiForm = document.getElementById('ai-form');
    const productInput = document.getElementById('product-input');
    const aiResult = document.getElementById('ai-result');
    const aiLoading = document.getElementById('ai-loading');
    
    // ▼▼▼ VÉRIFIEZ QUE C'EST BIEN VOTRE URL DE WEBHOOK ZAPIER ▼▼▼
    const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/23129157/u37yrql/'; // URL de votre screenshot

    aiForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche la page de se recharger
        
        const productDescription = productInput.value;
        if (!productDescription.trim()) {
            alert('Veuillez décrire le produit.');
            return;
        }

        aiLoading.style.display = 'block';
        aiResult.textContent = '';

        try {
            // On envoie la description au webhook Zapier en utilisant la méthode POST correcte
            const response = await fetch(zapierWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // On précise qu'on envoie du JSON
                },
                body: JSON.stringify({ // On met les données dans le corps de la requête
                    description: productDescription 
                })
            });

            if (response.ok) {
                const resultData = await response.json();
                // Adaptez la ligne ci-dessous en fonction de la réponse de Zapier
                aiResult.textContent = JSON.stringify(resultData, null, 2);
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
