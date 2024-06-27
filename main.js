// ADD BACKGROUND COLOR YELLOW FOR PAIRS CONTAINERS
const listContainer = document.querySelectorAll(".container");
listContainer.forEach((container, index) => {
  const isParContainer = (index + 1) % 2 === 0;
  if (isParContainer) {
    container.classList.add("container--bg-yellow");
  }
});

// EVENT FOR EACH LINK IN MENU
const listLinkMenu = document.querySelectorAll(".menu__link");
listLinkMenu.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Remove a classe 'list__link--active' de todos os links
    removeActiveClassFromLinks();
    // Adiciona a classe 'list__link--active' apenas ao link clicado
    addActiveClassToLinks(link);
    // Impede o comportamento padrão do link (navegação)
    event.preventDefault();

    // Obtém o ID do alvo do link
    const targetId = link.getAttribute("href");
    // Rolagem suave para o elemento de destino
    smoothScrollToSection(targetId);
  });
});

const listSkills = document.querySelectorAll(".skill");
listSkills.forEach((skill) => {
  skill.addEventListener("click", () => {
    skill.classList.toggle("skill--active");
  });
});

// EVENT FOR CLOSE MENU WHEN CLICK IN TOUCH SCREEN
const touchScreen = document.getElementById("screen");
touchScreen.addEventListener("click", (event) => closeMenu(event));

const toggleMenu = document.getElementById("button__menu");
toggleMenu.addEventListener("click", () => changeMenuButtonIcon());

function removeActiveClassFromLinks() {
  listLinkMenu.forEach((link) => {
    link.classList.remove("menu__link--active");
  });
}

function addActiveClassToLinks(link) {
  link.classList.add("menu__link--active");
}

function smoothScrollToSection(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
}

function changeMenuButtonIcon() {
  const iconButtonMenu = document.getElementById("icon__toggleMenu");

  // Remove todas as classes do ícone
  iconButtonMenu.classList.remove("fa-x", "fa-bars");

  // Adiciona a classe apropriada com base no estado do toggleMenu
  iconButtonMenu.classList.add(toggleMenu.checked ? "fa-x" : "fa-bars");
}

function closeMenu(event) {
  const navMenu = document.getElementById("nav__menu");

  const isMenuOpen = toggleMenu.checked;

  // Verifica se o clique não ocorreu dentro do menu
  if (!navMenu.contains(event.target)) {
    // Fecha o menu
    if (isMenuOpen) {
      toggleMenu.checked = false;
      changeMenuButtonIcon();

      listLinkMenu.forEach((link, index) => {
        index === 0
          ? link.classList.add("menu__link--active")
          : link.classList.remove("menu__link--active");
      });
    }
  }
}

const clientWidth = window.innerWidth;
clientWidth > 768 ? changeProjectLink() : null;

function changeProjectLink() {
  const listProjectLink = document.querySelectorAll(".link__button--active");
  listProjectLink.forEach((link) => {
    link.classList.remove("link__button--active");
  });
}

const listShowTextProjectButton = document.querySelectorAll(
  ".showTextProjectButton"
);
listShowTextProjectButton.forEach((button) => {
  button.addEventListener("click", () => {
    const iconButton = button.children[0];
    if (iconButton.classList.contains("fa-eye")) {
      iconButton.classList.remove("fa-eye");
      iconButton.classList.add("fa-eye-slash");
    } else {
      iconButton.classList.remove("fa-eye-slash");
      iconButton.classList.add("fa-eye");
    }
  });
});

(function () {
  emailjs.init("7nk2QLQ9TOCVc8KsL");
})();
// Script for submit e-mail form
function isValidEmail(email) {
  // Utilizando uma expressão regular simples para verificar o formato de e-mail
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    const nameInput = document.getElementById("insert--name");
    const emailInput = document.getElementById("insert--email");
    const subjectInput = document.getElementById("insert--subject");
    const messageInput = document.getElementById("insert--message");
    // Campos de erro
    const containerErrorMessage = document.querySelector(
      ".container__errorMessage "
    );
    const errorMessage = document.getElementById("errorMessage");

    event.preventDefault();
    if (
      nameInput.value.trim() == "" &&
      emailInput.value.trim() == "" &&
      isValidEmail(emailInput.value.trim()) &&
      subjectInput.value.trim() == "" &&
      messageInput.value.trim() == ""
    ) {
      event.preventDefault(); // Impede o envio do formulário
      // Exibe uma mensagem geral de erro caso necessário
      alert("Por favor, preencha todos os campos corretamente.");
    }

    // Verifica se o campo de nome está vazio ou só contém espaços em branco
    if (!nameInput.validity.valid || nameInput.value.trim() === "") {
      event.preventDefault(); // Impede o envio do formulário
      nameInput.style.border = "2px solid red";
      errorMessage.textContent = "Por favor, preencha o campo Nome.";
      containerErrorMessage.style.display = "block";
      return;
    }
    nameInput.style.borderColor = "transparent";

    // Verifica se o campo de nome excede o limite máximo de caracteres
    if (nameInput.value.length > 50 || nameInput.value.length < 3) {
      event.preventDefault(); // Impede o envio do formulário
      nameInput.style.border = "2px solid red";
      errorMessage.textContent =
        "O campo Nome deve conter no mínimo 3 caracteres e máximo 50 caracteres.";
      containerErrorMessage.style.display = "block";
      return;
    }
    // Verifica se o campo de e-mail está vazio
    if (emailInput.value.trim() === "") {
      event.preventDefault(); // Impede o envio do formulário
      emailInput.style.border = "2px solid red";
      errorMessage.textContent = "Por favor, preencha o campo E-mail.";
      containerErrorMessage.style.display = "block";
      return;
    }

    // Verifica se o campo de e-mail está em um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      event.preventDefault(); // Impede o envio do formulário
      emailInput.style.border = "2px solid red";
      errorMessage.textContent = "Por favor, insira um e-mail válido.";
      containerErrorMessage.style.display = "block";
      return;
    }
    emailInput.style.borderColor = "transparent";

    // Verifica se o campo de Assunto está vazio ou só contém espaços em branco
    if (subjectInput.value.trim() === "") {
      event.preventDefault(); // Impede o envio do formulário
      subjectInput.style.border = "2px solid red";
      errorMessage.textContent = "Por favor, preencha o campo Assunto.";
      containerErrorMessage.style.display = "block";
      return;
    }

    // Verifica se o campo de Assunto excede o limite máximo de 50 caracteres
    if (subjectInput.value.length > 50) {
      event.preventDefault(); // Impede o envio do formulário
      subjectInput.style.border = "2px solid red";
      errorMessage.textContent =
        "O campo Assunto deve ter no máximo 50 caracteres.";
      containerErrorMessage.style.display = "block";
      return;
    }
    subjectInput.style.borderColor = "transparent";

    // Verifica se o campo de Mensagem está vazio ou só contém espaços em branco
    if (messageInput.value.trim() === "") {
      event.preventDefault(); // Impede o envio do formulário
      messageInput.style.border = "2px solid red";
      errorMessage.textContent = "Por favor, preencha o campo Mensagem.";
      containerErrorMessage.style.display = "block";
      return;
    }
    errorMessage.style.borderColor = "none";

    // Verifica se o campo de Mensagem excede o limite máximo de 300 caracteres
    if (messageInput.value.length > 300 || messageInput.value.length < 1) {
      event.preventDefault(); // Impede o envio do formulário
      messageInput.style.border = "2px solid red";
      errorMessage.textContent =
        "O campo Mensagem deve ter no máximo 300 caracteres.";
      containerErrorMessage.style.display = "block";
    }
    messageInput.style.borderColor = "transparent";

    // Limpa a mensagem de erro se a validação passou
    errorMessage.textContent = "";
    containerErrorMessage.style.display = "none";

    // Configura os parâmetros para enviar
    const templateParams = {
      from_name: nameInput.value,
      from_email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
    };

    // Verifica se todos os campos estão preenchidos

    //Envia o formulário usando a API EmailJS
    emailjs.send("service_ssw8k7n", "template_zvw7lz1", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Mensagem enviada com sucesso!");
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Ocorreu um erro ao enviar a mensagem.");
      }
    );
  });

// window.addEventListener("scroll", () => changeLinkMenuOnScroll());

// function changeLinkMenuOnScroll() {
//   const scrollPosition = window.scrollY;

//   listContainer.forEach((container, index) => {
//     const containerTop = container.offsetTop;
//     const containerHeight = container.clientHeight;
//     const containerId = container.getAttribute("id");

//     if (
//       scrollPosition >= containerTop - 1 &&
//       scrollPosition < containerTop + containerHeight
//     ) {
//       removeActiveClassFromLinks();
//       addActiveClassToLinks(document.querySelector(`[href="#${containerId}"]`));
//     }
//   });
// }
