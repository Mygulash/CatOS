function updateTime() {
            var currentTime = new Date().toLocaleString();
            var timeText = document.querySelector("#timeElement");
            timeText.innerHTML = currentTime;
        }

setInterval(updateTime, 1000);

var photos = "./Photos"

var biggestIndex = 1;

var topBar = document.querySelector("#top")
var welcomeScreen = document.querySelector("#welcomewindow")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
var selectedIcon = undefined

var desktopApps = document.querySelectorAll(".desktopApps")

var NotesScreen = document.querySelector("#noteswindow")
var NotesScreenClose = document.querySelector("#notesclose")

const photoFiles = [
    "148-silly-cat-meme-template.jpg", "aaaaaa.jpg", "angy.jpg", 
    "angysmollcat.jpg", "apolocheese.jpg", "bigangy.jpg", "blind.jpg", 
    "blush.webp", "bruh.gif", "catskiing.gif", "catwithhearth.gif", 
    "crazyeating.jpg", "creepysmile.gif", "crying.jpg", "donttouch.jpg", 
    "dontwanttogo.jpg", "download.jpg", "Dsmile.jpg", "girlahhphoto.jpg", 
    "grrr.webp", "hehehe.jpg", "interesting.gif", "kocicka.webp", 
    "lick.jpg", "love.jpg"
];

var content = [
  {
    title: "Cat1",
    date: "06/28/2026",
    content: `
              <p contenteditable="True">
          Today i have fed my cat 2 times and hugged her for like 20 hours as I should!!!
        </p>
      `
  },
    {
    title: "Cat2",
    date: "06/28/2026",
    content: `
              <p contenteditable="True">
          My other cat was missing today D: But she came back in the evening so chill :)
        </p>
      `
  }
]

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    if (element.offsetTop - currentY < 56 + element.offsetHeight/2 ) {
      element.style.top = (56 + element.offsetHeight/2) + "px";
    } else {
      element.style.top = (element.offsetTop - currentY) + "px";
    }
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

NotesScreenClose.addEventListener("click", function() {
  closeWindow(NotesScreen);
});

desktopApps.forEach(icon => {
  icon.addEventListener("click", function() {
    console.log(icon);
    handleIconTap(icon);
  });
});


function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++; 
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
} 

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element) {
    console.log(element.classList)
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(document.querySelector("#"+element.id+"window"));
    } else {
        selectIcon(element);
    }
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

function handleWindowTap(element) {
  biggestIndex++; 
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function makeClosable(elementName) {
  var elementwindow = document.querySelector("#" + elementName + "window")
  var closeButton = document.querySelector("#" + elementName + "close")

  closeButton.addEventListener("click", function() {
    closeWindow(elementwindow);
  });
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName +"window")
  addWindowTapHandling(screen)
  makeClosable(elementName)
  dragElement(screen)
}

function setNotesContent(index) {
  var notesContent = document.querySelector("#notesContent")
  notesContent.innerHTML = content[index].content
}

function addToSideBar(index) {
	var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  var newDiv = document.createElement("div");
  newDiv.innerHTML = `
    <p style="margin-top: 8px; margin-bottom: 0px">
      ${note.title}
    </p>
    <p style="font-size: 12px; margin: 0px;">
      ${note.date}
    </p>
  `;
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  sidebar.appendChild(newDiv);
}

function loadGallery() {
    const galleryContainer = document.querySelector("#galleryContent");
    galleryContainer.innerHTML = ""; 

    for (let i = 0; i < photoFiles.length; i++) {
        let itemDiv = document.createElement("div");
        itemDiv.className = "galler-item"

        let img = document.createElement("img");
        img.src = `Photos/${photoFiles[i]}`;
        img.className = "gallery-image"; 

        let label = document.createElement("p");
        label.className = "gallery-label";
        label.innerText = photoFiles[i];

        itemDiv.appendChild(img);
        itemDiv.appendChild(label);

        galleryContainer.appendChild(itemDiv);
    }
}

for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}

setNotesContent(0)

initializeWindow("welcome")
initializeWindow("notes")
initializeWindow("gallery")
loadGallery()