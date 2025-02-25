function $(id) {
    return document.getElementById(id);
}
function $$(tag, index) {
    return document.getElementsByTagName(tag)[index];
}
function addTextNode(tag, text) {
    const p = document.createElement("p");
    const textNode = document.createTextNode(text);
    $(tag).appendChild(p.appendChild(textNode));
}
// Data for dropdowns
const gemImages = {
    Amethyst: "assets/img/amethyst.jpg",
    Steven: "assets/img/steven.jpg",
    Garnet: "assets/img/garnet.png",
    Pearl: "assets/img/pearl.png",
};

let data = {
    init: ["Are you a fusion", "Not fusion", "Fusion"],
    "Not fusion": ["Are you tall", "Tall", "Short"],
    Short: ["Is your character part human", "Yes", "No"],
    Yes: "Steven",
    No: "Amethyst",
    Fusion: "Garnet",
    Tall: "Pearl"
};
let data2 = {
    init:["Are you a diamond","Not Diamond","Diamond"],
    Diamond:["Are you tall", "Tall", "Short"],
    "Not Diamond": ["Is your character human", "Yes", "No"],
    Tall:["Are you blue","Blue","Not Blue"],
    "Not Blue":["Are you yellow","yellow","Not Yellow"],
    Short:"Pink Diamond",
    Blue:"Blue Diamond",
    yellow:"Yellow diamond",
    "Not Yellow":"White Diamond",
    Yes: "Connie",
    No:"Dog"

};

// Initialize the first dropdown
function init() {
    const selectHolder = document.getElementById("gemSelecter");
    createSelect(selectHolder, data.init, "init");

    // Check for browser compatibility
    if (!document.getElementById) {
        window.location = "legacy.html";
    }

    // Load user info from localStorage
    loadUserInfo();
    
}

//This is the spin functionality for the image

function displayImage(tag,gemName) {
    const imageDiv = $(tag);
    while (imageDiv.firstChild) {
    imageDiv.removeChild(imageDiv.firstChild);
    }
    
    if (gemImages[gemName]) {
        const img = document.createElement("img");
        img.setAttribute("src",gemImages[gemName])
        img.setAttribute("alt",gemName);
        img.setAttribute("style","opacity:0.1");
        imageDiv.appendChild(img);
    }
   
}
function fade(obj) {
    let opacity = parseFloat(obj.style.opacity);
    
    if (opacity < 1){
        opacity+=.01;
        obj.setAttribute("style",`opacity:${opacity}`);
        requestAnimationFrame(function(){fade(obj);});
    }
    //tried to do a spin originally 
    // angle += 5; 
    //         img.style.transform = `rotate(${angle}deg)`; // Apply the rotation

    //         if (angle < 360) {
    //             requestAnimationFrame(spin); // Continue spinning until a full rotation
    //         } else {
    //             img.style.transform = 'rotate(0deg)'; // Reset rotation 
    //         }
    //     }
    

}
// Create select dropdown
function createSelect(parent, options, key) {
    const select = document.createElement("select");
    select.setAttribute("data-key", key);

    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });

    select.addEventListener("change", function () {
        handleSelection(this);
    });

    parent.appendChild(select);
}

// Handle user selection and create the next dropdown
function handleSelection(select) {
    const nextKey = select.value;
    const parent = $("gemSelecter");

    // Clear previous selections after current
    const nextSelects = parent.querySelectorAll("select[data-key]");
    const selectedIndex = Array.from(parent.children).indexOf(select); // Get the index of the currently selected dropdown
    
    nextSelects.forEach((s, index) => {
        // Only remove dropdowns that come after the current selection
        if (index > selectedIndex) {
            parent.removeChild(s);
        }
    });
    const resultDiv = $("result");
    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild) // Remove all children from the results area
        if($("imageContainer").hasChildNodes()){
            $("imageContainer").removeChild($("imageContainer").firstChild);
        }
        
    }
    // If last selection is made, show the result
    if (typeof data[nextKey] === "string") {
        displayResult(data[nextKey]);
    } else if (data[nextKey]) {
        const nextOptions = Array.isArray(data[nextKey]) ? data[nextKey] : [data[nextKey]];
        createSelect(parent, nextOptions, nextKey);
    }

}

// Display the result
function displayResult(result) {
    const resultDiv = $("result");
    const resultText = document.createElement("p");
    resultText.textContent = `You are: ${result}`;
    resultDiv.appendChild(resultText);
    displayImage("imageContainer",result);
    const pic=$("imageContainer").firstChild;
    requestAnimationFrame(function(){fade(pic);});
    storeResultInCookie(result);
}


// Validate user info form
function validate() {
    const fnameInput = $("firstName");
    const lnameInput = $("lastName");
    const Email = $("email");
    const form = $("user-info-form");

    if (fnameInput.value.trim() === "") {
        const text = document.createTextNode("Missing first name data");
        error.appendChild(text);
        return false;
    }
    if (lnameInput.value.trim() === "") {
        const text = document.createTextNode("Missing last name data");
        error.appendChild(text);
        return false;
    }
    if (Email.value.trim() === "") {
        const text = document.createTextNode("Missing email data");
        error.appendChild(text);
        return false;
    }

    // Save user info to localStorage
    localStorage.setItem("firstName", fnameInput.value);
    localStorage.setItem("lastName", lnameInput.value);
    localStorage.setItem("email", Email.value);
    let confirmation = document.createElement("p");
    const text = confirmation.createTextNode("Your choices are saved.");
    text.$("user-info-form").appendChild(text);

    // Prevent form submission for demo
}

// Load user info from localStorage
function loadUserInfo() {
    const fname = localStorage.getItem("firstName");
    const lname = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    if (window.localStorage){
        if (fname && lname && email) {
        const p = document.createElement("p");
        const textNode = document.createTextNode(`Your name is ${fname} ${lname}. Your email is ${email}.`);
        p.appendChild(textNode); 
        $("Stored").appendChild(p);
    }
    }else {
        //should load anystored cookies
        if (GetCookie("result") != null){
        loadResultFromCookie()
    }
}
    
}


// Clear button functionality

$("clear").addEventListener("click", function () {
    $("user-info-form").reset();
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
    while ($("Stored").firstChild) {
        $("Stored").removeChild($("Stored").firstChild);
    }
});

function loadCookie() {
    const result = GetCookie("lastResult");
    if (result) {
        const storedDiv = $("Stored");
        const storedText = document.createElement("p");
        storedText.textContent = `Last stored result: ${result}`;
        storedDiv.appendChild(resultText);
        
        displayImage("Stored",result); // Display the corresponding image
    }
}
function storeResultInCookie(result) {
    // Store the result in a cookie named "gemResult" with a max age of 7 days (604800 seconds)
    SetCookie("lastResult", result, 86400); // store for 1 day hopefully
}

// cookies.js
// You can use this code for your projects!
// Derived from the Bill Dortch code at http://www.hidaho.com/cookies/cookie.txt

function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return decodeURIComponent (document.cookie.substring(offset, endstr));
	}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal (j);
			}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
		}
	return null;
	}

function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}

/////////
// use:
//		SetCookie("name", "value", 3000);
//		SetCookie("name", "value", 1000,false,false,false,true);
//		If set the secure (last arg) to true, you MUST be on an https connection!
/////////


/////////
// use:
//		SetCookie("name", "value", 3000);
//		SetCookie("name", "value", 1000,false,false,false,true);
//		If set the secure (last arg) to true, you MUST be on an https connection!
/////////

//Only need to send in name and value
function SetCookie (name,value,maxAge,path,domain,sameSite,secure) {
  document.cookie = name + "=" + encodeURIComponent(value) +
    ((maxAge) ? ";max-age=" + maxAge  : "") +
    ((path) ? ";path=" + path  : "") +
    ((domain) ? ";domain=" + domain : "") +
    ((sameSite) ? ";samesite=" + sameSite : ";samesite=strict") +
    ((secure) ? ";secure;" : ";");
}