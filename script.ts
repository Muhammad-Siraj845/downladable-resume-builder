// Function to generate a simple unique ID (you can replace this with a UUID library if needed)
function generateUniqueId(): string {
    return 'id_' + Math.random().toString(36).substr(2, 9);  // Simple random string generator
}

// TypeScript: Function to add additional education fields
function addEducation(): void {
    const educationContainer = document.getElementById("educationContainer") as HTMLElement;
    const newEducationInput = document.createElement("input");
    newEducationInput.type = "text";
    newEducationInput.className = "education";
    newEducationInput.placeholder = "Degree, Institution";
    educationContainer.appendChild(newEducationInput);
}

// TypeScript: Function to add additional experience fields
function addExperience(): void {
    const experienceContainer = document.getElementById("experienceContainer") as HTMLElement;
    const newExperienceInput = document.createElement("input");
    newExperienceInput.type = "text";
    newExperienceInput.className = "experience";
    newExperienceInput.placeholder = "Job Title, Company";
    experienceContainer.appendChild(newExperienceInput);
}

// TypeScript: Function to generate the resume output
function generateResume(): void {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;

    const educationInputs = document.getElementsByClassName("education") as HTMLCollectionOf<HTMLInputElement>;
    const experienceInputs = document.getElementsByClassName("experience") as HTMLCollectionOf<HTMLInputElement>;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(',').map(skill => skill.trim());

    let educationList = '';
    for (let i = 0; i < educationInputs.length; i++) {
        const educationInput = educationInputs[i];
        if (educationInput.value) {
            educationList += `<p class="editable">${educationInput.value}</p>`;
        }
    }

    let experienceList = '';
    for (let i = 0; i < experienceInputs.length; i++) {
        const experienceInput = experienceInputs[i];
        if (experienceInput.value) {
            experienceList += `<p class="editable">${experienceInput.value}</p>`;
        }
    }

    const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
    resumeOutput.innerHTML = `
        <h2 class="editable">${name}</h2>
        <p><strong>Email:</strong> <span class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span class="editable">${phone}</span></p>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="editable">${linkedin}</a></p>
        <h3>Education</h3>
        ${educationList}
        <h3>Work Experience</h3>
        ${experienceList}
        <h3>Skills</h3>
        <p class="editable">${skills.join(', ')}</p>
    `;

    // Generate a unique ID for this session
    const uniqueId = generateUniqueId();

    // Store the resume data in localStorage using the unique ID
    const resumeData = {
        name,
        email,
        phone,
        linkedin,
        education: Array.prototype.slice.call(educationInputs).map((input: HTMLInputElement) => input.value),
        experience: Array.prototype.slice.call(experienceInputs).map((input: HTMLInputElement) => input.value),
        skills
    };

    localStorage.setItem(uniqueId, JSON.stringify(resumeData));

    // Generate the shareable link with the unique ID
    const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(uniqueId)}`;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    document.getElementById('shareable-link-container')!.style.display = 'block';
}

// Handle PDF download
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This opens the print dialog, allowing the user to save as PDF
});

// Prefill the form based on the username in the URL (unique ID)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uniqueId = urlParams.get('username');  // Get the unique ID from the URL

    if (uniqueId) {
        // Autofill form if data is found in localStorage for the given unique ID
        const savedResumeData = localStorage.getItem(uniqueId);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('linkedin') as HTMLInputElement).value = resumeData.linkedin;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills.join(', ');

            // Prefill education and experience fields
            const educationContainer = document.getElementById('educationContainer') as HTMLElement;
            resumeData.education.forEach((degree: string) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'education';
                input.value = degree;
                educationContainer.appendChild(input);
            });

            const experienceContainer = document.getElementById('experienceContainer') as HTMLElement;
            resumeData.experience.forEach((job: string) => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'experience';
                input.value = job;
                experienceContainer.appendChild(input);
            });
        }
    }
});
