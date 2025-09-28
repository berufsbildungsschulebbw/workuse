// progress-tracker.js - Fortschrittsverwaltung für alle Module

// Aktuelle Modul-Konfiguration
const currentModule = {
    id: null,
    totalSteps: 0,
    completedSteps: new Set()
};

// Initialisiert das Modul auf der jeweiligen Seite
function initModule(moduleId, totalSteps) {
    currentModule.id = moduleId;
    currentModule.totalSteps = totalSteps;
    
    // Lade gespeicherte Fortschritte
    const saved = localStorage.getItem(`module_${moduleId}_steps`);
    if (saved) {
        currentModule.completedSteps = new Set(JSON.parse(saved));
    }
    
    console.log(`Modul ${moduleId} initialisiert mit ${totalSteps} Schritten`);
    updateModuleProgress();
}

// Markiert einen Schritt als abgeschlossen
function markStepComplete(stepId) {
    currentModule.completedSteps.add(stepId);
    saveProgress();
    updateModuleProgress();
    console.log(`Schritt ${stepId} abgeschlossen`);
}

// Speichert den Fortschritt
function saveProgress() {
    if (!currentModule.id) return;
    
    // Speichere die abgeschlossenen Schritte
    localStorage.setItem(
        `module_${currentModule.id}_steps`,
        JSON.stringify(Array.from(currentModule.completedSteps))
    );
    
    // Speichere den Gesamtfortschritt für die Startseite
    localStorage.setItem(
        `module_${currentModule.id}_progress`,
        JSON.stringify({
            completed: currentModule.completedSteps.size,
            total: currentModule.totalSteps,
            lastUpdated: new Date().toISOString()
        })
    );
}

// Aktualisiert die Anzeige auf der aktuellen Seite
function updateModuleProgress() {
    const percentage = (currentModule.completedSteps.size / currentModule.totalSteps) * 100;
    console.log(`Modul ${currentModule.id}: ${Math.round(percentage)}% abgeschlossen`);
}

// Hilfsfunktion zum Zurücksetzen eines Moduls
function resetModule(moduleId) {
    localStorage.removeItem(`module_${moduleId}_steps`);
    localStorage.removeItem(`module_${moduleId}_progress`);
    location.reload();
}