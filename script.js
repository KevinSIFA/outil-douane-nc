// ===================================
// SCRIPT DE DÉBOGAGE UNIQUEMENT
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("ÉTAPE 1 : La page est chargée.");

    const aiForm = document.getElementById('ai-form');
    const productInput = document.getElementById('product-input');
    const aiResult = document.getElementById('ai-result');

    if (aiForm) {
        console.log("ÉTAPE 2 : Le formulaire <form id='ai-form'> a été trouvé.");

        aiForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log("ÉTAPE 3 : Le bouton a été cliqué, l'événement 'submit' est capturé.");
            
            const text = productInput.value;
            console.log("ÉTAPE 4 : Le texte entré est :", text);

            aiResult.style.color = 'green';
            aiResult.textContent = `TEST RÉUSSI. Le bouton est bien connecté au JavaScript. Vous avez tapé : "${text}"`;
            console.log("ÉTAPE 5 : Le texte du résultat a été changé.");
        });

    } else {
        console.error("ERREUR CRITIQUE : Le formulaire avec l'id 'ai-form' est INTROUVABLE !");
    }
});
