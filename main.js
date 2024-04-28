import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader'



const image = document.getElementById('myImage');
const heading = document.getElementById('heading');
const details = document.getElementById('details');
const canvas = document.getElementById('scene');


function triggerAnimation() {
     
    heading.classList.add('scroll-animation');
    details.classList.add('scroll-animation');
    const anchorLinks = document.querySelectorAll('.rotation-link');
    console.log("444",anchorLinks[0].classList)
    anchorLinks[0].classList.remove('animi-rest')
    anchorLinks[0].classList.add('scroll-animation')
    const anchorLinks1 = document.querySelectorAll('.rotation-link a');
    anchorLinks1.forEach(link => {
        link.classList.remove('animi-rest');
        link.classList.add('scroll-animation');
        console.log(link.className,link)
    });
 
}





var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.z = 2.25;
camera.position.y = 0.75



var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

const mtlLoader = new MTLLoader();

let model
mtlLoader.load(
    'assets/Model1.mtl',
    function (materials) {
        materials.preload();
        console.log(materials, "MMM")
        
        for (const materialName in materials.materials) {
            if (Object.hasOwnProperty.call(materials.materials, materialName)) {
                console.log("Modifying color of material:", materialName);
                const material = materials.materials[materialName];

                if (materialName === 'Material_55') { 
                    material.color.set(0x965A3E); // sticks 
                }
                if (materialName === 'water') {
                    material.color.set(0x0E87CC,); //water blue
                }
                if (materialName === 'lawer') {
                    material.color.set(0x013220); // two flowers under tree
                }
                if (materialName === 'Material.007') { 
                    material.color.set(0xddddf); // srounded layer
                }
                if (materialName === 'Material.006') {
                    material.color.set(0xffa500); // tree fruit
                }
                if (materialName === 'Material.005') { 
                    material.color.set(0x77a37a); // Tree leaves 
                }
                if (materialName === 'Material.004') { 
                    material.color.set(0x725F4B); // tree trunck
                } if (materialName === 'Material.003') { 
                    material.color.set(0xA1662F); // boat 
                }
                if (materialName === 'Material.002') {
                    material.color.set(0xC2B280); // stone
                }
                if (materialName === 'Material.001') {
                    material.color.set(0x00ff00); // layer under tree
                }
            }
        }
        const objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(
            'assets/Model3d1.obj',
            function (object) {
                model = object
                scene.add(object);
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function (error) {
                console.error('Error loading OBJ file:', error);
            }
        );
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Error loading MTL file:', error);
    }
);



const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)






function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();






let rotationAngle = 0;
let isRotating = false;
let totalRotations = 0;

const rotationData = [

    {
        heading: "Underwriting", details: ["Comprehensive interior and exterior data for total property understanding, more informed underwriting",
            "Industry leading self-service inspection experience that customers overwhelmingly prefer",
            "Better data, faster, with accelerated data-intake during the underwriting window"], linkText: 'Flyreel for Underwriting', link: '#'
    },
    {
        heading: "Claims", details: ["Accelerate claim cycle times and engage customers at their time of need with AI-assisted FNOL",
            "Desk-adjust, triage and prioritize claims with faster and more comprehensive data intake",
            "Reduce LAE while improving response times and customer satisfaction"], linkText: 'Flyreel for Claims', link: '#'
    },
    {
        heading: "Risk Management", details: ["Protect customers with AI-assisted loss control surveys and self-service inspections",
            "Automatic hazard and risk identification across the entire book of business",
            "Personalized risk recommendations delievered at-scale"], linkText: 'Flyreel for Risk Management', link: '#'
    },

];

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

window.addEventListener('wheel', debounce(function (event) {
    if (isRotating) {
        event.preventDefault();
        return;
    }
    let deltaAngle = event.deltaY > 0 ? Math.PI / 2 : -Math.PI / 2;

    let newRotationAngle = rotationAngle + deltaAngle;
    console.log(rotationAngle, totalRotations, "IJI")


    if (event.deltaY > 0) {

        if (rotationAngle === 0) {
            rotationAngle = 1.5707963267948966
            totalRotations = 0
            console.log(camera,camera.position["z"],"LL")

            camera.fov="45"
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.position["z"]=1.25
            camera.position["y"]=1.25
            camera.updateProjectionMatrix();
           
        }
        else if (rotationAngle === 1.5707963267948966) {
            rotationAngle = 3.141592653589793
            totalRotations = 1
            camera.fov="55"
            camera.position["z"]=1.75
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
           
        }
        else if (rotationAngle === 3.141592653589793) {
            rotationAngle = 4.71238898038469
            totalRotations = 2
            camera.fov="75"
            camera.position["z"]=1.50
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
          
        }
        else if (rotationAngle === 4.71238898038469) {
            rotationAngle = 4.71238898038469
            totalRotations = 2
            maxrotation=1
            camera.fov="75"
            camera.position["z"]=1.25
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
          
        }




    }
    else if (event.deltaY < 0) {


        if (rotationAngle === 0 && totalRotations <= 0) {
            rotationAngle = 0
            totalRotations = -1
            camera.fov="95"
            camera.position["z"]=2.25;
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
       
        }
        else if (rotationAngle === 1.5707963267948966) {
            rotationAngle = 0
            totalRotations = -1
            camera.fov="95"
            camera.position["z"]=2.25;
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
      
           
        }
        else if (rotationAngle === 3.141592653589793) {
            rotationAngle = 1.5707963267948966
            totalRotations = 0
           
            camera.fov="45"
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.position["z"]=1.25
            camera.position["y"]=1.25
            camera.updateProjectionMatrix();
        }
        else if (rotationAngle === 4.71238898038469) {
            rotationAngle = 3.141592653589793
            totalRotations = 1
     
            camera.fov="55"
            camera.position["z"]=1.75
            camera.position["y"]=0.75
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }



    }

    isRotating = true;
    console.log(rotationAngle, totalRotations, "UUU")

    gsap.to(model.rotation, {
        y: rotationAngle, duration: 0.3, onComplete: () => {
            heading.classList.remove('scroll-animation');
            details.classList.remove('scroll-animation');

            heading.classList.add('animi-rest');
            details.classList.add('animi-rest');

            const anchorLinks = document.querySelectorAll('.rotation-link a');
            console.log(anchorLinks,totalRotations,"KKK")
           

            const { heading: rotationHeading, details: rotationDetails,
                link: rotationLink, linkText: rotationLinkText } = totalRotations === -1 ? {} : rotationData[totalRotations];
            heading.textContent = rotationHeading;
            {
                totalRotations === -1 ? details.innerHTML = "" :
                details.innerHTML = rotationDetails.map(detail => `<p>${detail}</p>`).join('')
            }

            const rotationLinkElement = document.querySelector('.rotation-link');
            if (rotationLinkElement) {
                rotationLinkElement.parentNode.removeChild(rotationLinkElement);
            }
            if (rotationLink) {
                details.insertAdjacentHTML('afterend', `<p class="rotation-link animi-rest" style="display:inline"><a href="${rotationLink}">${rotationLinkText}</a>
                <svg xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink" 
                x="0px" y="0px" width="100%" height="100%"
                viewBox="0 0 16 16"
                class="SVGClass"
                 style="
                 width: 18.391;
                 height: 20.391;
                  width: 30.391;
                  color: #11e8ff;
                  cursor: pointer;
                >
                <g transform="translate(0, 0)">
                    <line fill="none" stroke="currentColor" stroke-miterlimit="10" x1="14.5" y1="1.5" x2="1.5" y2="14.5" data-color="color-2"></line>
                    <polyline fill="none" stroke="currentColor" stroke-miterlimit="10" points="7.5,1.5 14.5,1.5 14.5,8.5 "></polyline>
                </g>

            </svg>
                </p>`);
            }
            isRotating = false;


            
            
                setTimeout(()=>{
                    triggerAnimation()
                },200)
            

            
            
          



        }

    });
    console.log(rotationAngle, totalRotations, "III")

    event.preventDefault();
}, 200));








