function updateTime() {
            var currentTime = new Date().toLocaleString();
            var timeText = document.querySelector("#timeElement");
            timeText.innerHTML = currentTime;
        }

setInterval(updateTime, 1000);

var biggestIndex = 1;

var topBar = document.querySelector("#top")
var welcomeScreen = document.querySelector("#welcome")
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
var selectedIcon = undefined

var desktopApps = document.querySelectorAll(".desktopApps")

var NotesScreen = document.querySelector("#notes")
var NotesScreenClose = document.querySelector("#notesclose")

var content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `
              <p contenteditable="True">
          <span contenteditable="true">Welcome to <strong>Hacker Notes</strong>
            </br>
            </br>
            <img src=""
              style="width: 96px; border-radius: 16px" />
            </br>
            </br>

            This is a place where I store my thoughts as they come to mind. What exactly will you find when browsing
            through
            these notes? As I <del>once said</del> <ins>always say</ins>
          </span>
        <blockquote
          style="background-color: #F9F9F9; margin-top: 16x; margin-bottom: 16px; margin-left: 0px; margin-right: 0px; padding: 16px; border-radius: 16px;"
          contenteditable="true">
          <i>Time Will Tell
            </br>
            ~ Thomas
          </i>
        </blockquote>
        <span contenteditable="true">
          I suppose you may see a bit of content about technology. Perhaps some insights regarding recent projects.
          Maybe
          even some thoughts regarding nature & tea? Go and find out!
        </span>
        </p>
      `
  },
    {
    title: "Sample Text",
    date: "06/28/2023",
    content: `
              <p contenteditable="True">
          Here's some sample text
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
    handleIconTap(icon);
  });
});


function closeWindow(element) {
  element.style.display = "none"
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  // Increment biggestIndex by 1
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
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(NotesScreen);
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
  biggestIndex++;  // Increment biggestIndex by 1
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
  deselectIcon(selectedIcon)
}

function makeClosable(elementName) {
  var element = document.querySelector("#" + elementName)
  var closeButton = document.querySelector("#" + elementName + "close")
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
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

for (let i = 0; i < content.length; i++) {
  addToSideBar(i)
}

setNotesContent(0)

initializeWindow("welcome")
initializeWindow("notes")
