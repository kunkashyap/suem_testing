import * as THREE from "three";

export const heartMarkers = [
    {
        id: "aorta",
        title: "Aorta",
        description: "The aorta is the largest artery in the body, responsible for carrying oxygenated blood from the heart to the rest of the body. It originates from the left ventricle of the heart and extends down to the abdomen, where it branches into smaller arteries. The aorta has several sections, including the ascending aorta, aortic arch, and descending aorta. It plays a crucial role in maintaining blood pressure and ensuring that oxygen-rich blood reaches all organs and tissues.",
        position: new THREE.Vector3(0.5, 0.95, -0.10),
    },


    {
        id: "leftVentricle",
        title: "Left Ventricle",
        description: "The left ventricle is one of the four chambers of the heart, located in the lower left portion. It is responsible for pumping oxygenated blood received from the left atrium into the aorta, which then distributes it to the rest of the body. The left ventricle has thick muscular walls that enable it to generate high pressure needed to propel blood through the systemic circulation. It plays a crucial role in maintaining adequate blood flow and ensuring that oxygen-rich blood reaches all organs and tissues.",
        position: new THREE.Vector3(0.15, -0.35, 0.18),
    },

    {
        id: "rightAtrium",
        title: "Right Atrium",
        description: "The right atrium is one of the four chambers of the heart, located in the upper right portion. It receives deoxygenated blood from the body through the superior and inferior vena cavae and pumps it into the right ventricle. The right atrium plays a crucial role in maintaining proper blood flow and ensuring that deoxygenated blood is efficiently directed to the lungs for oxygenation.",
        position: new THREE.Vector3(-0.28, 0.30, 0.20),
    },

    {
        id: "pulmonaryArtery",
        title: "Pulmonary Artery",
        description: "The pulmonary artery carries deoxygenated blood from the right ventricle of the heart to the lungs for oxygenation. It is the only artery in the body that carries deoxygenated blood, making it unique among the circulatory system's vessels.",
        position: new THREE.Vector3(0.35, 0.65, 0.15),
    }


];