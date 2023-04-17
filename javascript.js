let counter = 0;
const addValue = document.getElementById("mission");
const warning = document.getElementById("warning");
const container = document.getElementById("container");
const delAll = document.getElementById("delAll");
let editClicked = true;
function setFocus() {
  mission.focus();
}
setFocus();
function saveData(container) {
  localStorage.setItem("task", container.innerHTML);
}
function counterRefresh() {
  const spanCheck = document.getElementsByClassName("spanCount");
  for (let i = 0; i < spanCheck.length; i++) {
    spanCheck[i].textContent = i + 1;
  }
}
function restoreData() {
  let storedData = localStorage.getItem("task");
  if (storedData) {
    container.innerHTML = storedData;
    counter = document.querySelectorAll(".task").length;
    container.children.length + 1;
    if (counter >= 2) {
      delAll.style.display = "block";
    }
  }
}
restoreData();
function addTask(paragraph, missionCard) {
  counter++;
  missionCard.classList.add("task");
  paragraph.innerHTML = `<span class = 'spanCount'>${counter}</span> . ${addValue.value}`;
  container.appendChild(missionCard);
  addValue.value = "";
  warning.innerHTML = "";
  missionCard.appendChild(paragraph);
  if (counter == 2) {
    delAll.style.display = "block";
  }
  counterRefresh();
}
function finishTask(missionCard, paragraph) {
  let viClicked = true;
  const h4 = document.createElement("h4");
  let vi = document.createElement("h4");
  vi.classList.add("finishTask");
  vi.innerHTML = "✓";
  missionCard.appendChild(vi);
  vi.addEventListener("click", () => {
    if (viClicked) {
      paragraph.style.textDecoration = "line-through";
      paragraph.style.color = "grey";
      vi.style.color = "green";
      h4.style.color = "crimson";
      h4.innerHTML = "✘";
      viClicked = false;

      return;
    } else {
      paragraph.style.textDecoration = "none";
      paragraph.style.color = "rgba(255, 255, 255, 0.87)";
      vi.style.color = "white";
      h4.style.color = "white";
      h4.innerHTML = "✗";
      viClicked = true;
    }
    saveData(container);
  });
}
function removeTask(missionCard) {
  let h4 = missionCard.querySelector(".removeTask");
  if (!h4) {
    h4 = document.createElement("h4");
    h4.classList.add("removeTask");
    h4.innerHTML = "✗";
    missionCard.appendChild(h4);
    h4.setAttribute("onclick", "removeTask(this.parentElement)");
  }
  h4.addEventListener("click", () => {
    missionCard.remove();
    counterRefresh();
    saveData(container);
  });
}
function editTask(missionCard) {
  let p = document.createElement("h4");
  p.classList.add("editTask");
  p.innerHTML = "✒️";
  missionCard.appendChild(p);
  p.style.color = "white";
  p.setAttribute("onclick", "editLocal(this)");
  saveData(container);
}

function editLocal(p) {
  const paragraph = p.parentElement.children[1];

  paragraph.contentEditable = true;
  paragraph.focus();
  p.innerHTML = "💾";
  if (editClicked) {
    editClicked = false;
    return;
  } else {
    p.innerHTML = "✒️";
    paragraph.contentEditable = false;
    editClicked = true;
  }
  saveData(container);
}

function missionAdd(e, btnTask) {
  const paragraph = document.createElement("p");
  const missionCard = document.createElement("div");
  if (e.keyCode == "13" || btnTask) {
    finishTask(missionCard, paragraph);

    if (addValue.value.trim().length <= 5) {
      const shakeThat = [
        { transform: "rotate(0deg)" },
        { transform: "rotate(5deg)" },
        { transform: "rotate(0deg)" },
        { transform: "rotate(-5deg)" },
        { transform: "rotate(0deg)" },
      ];
      const shakeThatTiming = {
        duration: 500,
        iterations: 2,
      };
      warning.innerHTML = "*You must write at least 5 letters.";
      addValue.animate(shakeThat, shakeThatTiming);
      return;
    } else {
      addTask(paragraph, missionCard);
    }
  }
  editTask(missionCard, paragraph);
  removeTask(missionCard);
  saveData(container);
}
function DeleteAll() {
  const container = document.getElementById("container");
  localStorage.clear();
  container.remove();
  location.reload();
}
