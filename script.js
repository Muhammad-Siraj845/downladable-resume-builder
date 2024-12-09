// Function to generate a simple unique ID (you can replace this with a UUID library if needed)
function generateUniqueId() {
    return 'id_' + Math.random().toString(36).substr(2, 9); // Simple random string generator
}
// TypeScript: Function to add additional education fields
function addEducation() {
    var educationContainer = document.getElementById("educationContainer");
    var newEducationInput = document.createElement("input");
    newEducationInput.type = "text";
    newEducationInput.className = "education";
    newEducationInput.placeholder = "Degree, Institution";
    educationContainer.appendChild(newEducationInput);
}
// TypeScript: Function to add additional experience fields
function addExperience() {
    var experienceContainer = document.getElementById("experienceContainer");
    var newExperienceInput = document.createElement("input");
    newExperienceInput.type = "text";
    newExperienceInput.className = "experience";
    newExperienceInput.placeholder = "Job Title, Company";
    experienceContainer.appendChild(newExperienceInput);
}
// TypeScript: Function to generate the resume output
function generateResume() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var linkedin = document.getElementById("linkedin").value;
    var educationInputs = document.getElementsByClassName("education");
    var experienceInputs = document.getElementsByClassName("experience");
    var skills = document.getElementById("skills").value.split(',').map(function (skill) { return skill.trim(); });
    var educationList = '';
    for (var i = 0; i < educationInputs.length; i++) {
        var educationInput = educationInputs[i];
        if (educationInput.value) {
            educationList += "<p class=\"editable\">".concat(educationInput.value, "</p>");
        }
    }
    var experienceList = '';
    for (var i = 0; i < experienceInputs.length; i++) {
        var experienceInput = experienceInputs[i];
        if (experienceInput.value) {
            experienceList += "<p class=\"editable\">".concat(experienceInput.value, "</p>");
        }
    }
    var resumeOutput = document.getElementById("resumeOutput");
    resumeOutput.innerHTML = "\n        <h2 class=\"editable\">".concat(name, "</h2>\n        <p><strong>Email:</strong> <span class=\"editable\">").concat(email, "</span></p>\n        <p><strong>Phone:</strong> <span class=\"editable\">").concat(phone, "</span></p>\n        <p><strong>LinkedIn:</strong> <a href=\"").concat(linkedin, "\" target=\"_blank\" class=\"editable\">").concat(linkedin, "</a></p>\n        <h3>Education</h3>\n        ").concat(educationList, "\n        <h3>Work Experience</h3>\n        ").concat(experienceList, "\n        <h3>Skills</h3>\n        <p class=\"editable\">").concat(skills.join(', '), "</p>\n    ");
    // Generate a unique ID for this session
    var uniqueId = generateUniqueId();
    // Store the resume data in localStorage using the unique ID
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        linkedin: linkedin,
        education: Array.prototype.slice.call(educationInputs).map(function (input) { return input.value; }),
        experience: Array.prototype.slice.call(experienceInputs).map(function (input) { return input.value; }),
        skills: skills
    };
    localStorage.setItem(uniqueId, JSON.stringify(resumeData));
    // Generate the shareable link with the unique ID
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(uniqueId));
    var shareableLinkElement = document.getElementById('shareable-link');
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    document.getElementById('shareable-link-container').style.display = 'block';
}
// Handle PDF download
var downloadPdfButton = document.getElementById('download-pdf');
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This opens the print dialog, allowing the user to save as PDF
});
// Prefill the form based on the username in the URL (unique ID)
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var uniqueId = urlParams.get('username'); // Get the unique ID from the URL
    if (uniqueId) {
        // Autofill form if data is found in localStorage for the given unique ID
        var savedResumeData = localStorage.getItem(uniqueId);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('linkedin').value = resumeData.linkedin;
            document.getElementById('skills').value = resumeData.skills.join(', ');
            // Prefill education and experience fields
            var educationContainer_1 = document.getElementById('educationContainer');
            resumeData.education.forEach(function (degree) {
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'education';
                input.value = degree;
                educationContainer_1.appendChild(input);
            });
            var experienceContainer_1 = document.getElementById('experienceContainer');
            resumeData.experience.forEach(function (job) {
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'experience';
                input.value = job;
                experienceContainer_1.appendChild(input);
            });
        }
    }
});
