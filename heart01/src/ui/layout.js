export function createLayout() {
    document.body.innerHTML = `
    <div id = "app">
        <aside id = "left-panel">
            <h2> Heart Viewer </h2>

            <input
                id = "search"
                placeholder = "Search..."
            />
            
            <div id = "organ-info">
                <h3> Heart </h3>
                <p> The heart is a muscular organ that pumps blood through the circulatory system. It is located in the chest, between the lungs, and is responsible for maintaining the flow of oxygenated blood to the body and deoxygenated blood to the lungs. The heart has four chambers: two atria and two ventricles, which work together to ensure efficient blood circulation. </p>
            </div>
        </aside>

        <main id = "viewer">
        </main>

        <aside id = "right-panel">
            <h2> Controls </h2>
            <button id = "reset-camera"> Reset Camera </button>
            <button id = "wireframe"> Toggle Wireframe </button>
        </aside>
    </div>
    `;
}