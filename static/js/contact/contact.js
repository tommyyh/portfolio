// Append CSRF token on every request
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

(() => {
  const getElemet = (className) => {
    const element = document.querySelector(className);

    return element;
  };

  const nameInput = getElemet('#name');
  const emailInput = getElemet('#email');
  const msgInput = getElemet('#msg');
  const nameLabel = getElemet('#name_label');
  const emailLabel = getElemet('#email_label');
  const msgLabel = getElemet('#msg_label');
  const button = getElemet('.send_button');
  const title = getElemet('#socials_title');

  // Change the title on browser rezie (mobile, desktop, ...)
  if (window.innerWidth > 1025) {
    title.innerHTML = 'Socials & Informations';
  }

  const changeTitle = () => {
    if (window.innerWidth > 1025) {
      title.innerHTML = 'Socials & Informations';
    } else {
      title.innerHTML = 'Socials & Info';
    }
  };

  window.addEventListener('resize', changeTitle);

  // Adjust floating labels on focus
  nameInput.addEventListener('focusin', () => {
    nameLabel.style.top = '31%';
    nameLabel.style.color = '#acacac';
    nameLabel.style.fontSize = '0.55rem';

    nameLabel.style.color = '#b9b9b9';
    nameLabel.innerHTML = 'Full Name';
    nameInput.style.border = 'none';
  });

  nameInput.addEventListener('focusout', () => {
    if (!nameInput.value) {
      nameLabel.style.top = '46%';
      nameLabel.style.color = '#e6e6e6';
      nameLabel.style.fontSize = '0.81rem';
    }
  });

  emailInput.addEventListener('focusin', () => {
    emailLabel.style.top = '31%';
    emailLabel.style.color = '#acacac';
    emailLabel.style.fontSize = '0.55rem';

    emailLabel.style.color = '#b9b9b9';
    emailLabel.innerHTML = 'Email Address';
    emailInput.style.border = 'none';
  });

  emailInput.addEventListener('focusout', () => {
    if (!emailInput.value) {
      emailLabel.style.top = '46%';
      emailLabel.style.color = '#e6e6e6';
      emailLabel.style.fontSize = '0.81rem';
    }
  });

  msgInput.addEventListener('focusin', () => {
    msgLabel.style.top = '18%';
    msgLabel.style.color = '#acacac';
    msgLabel.style.fontSize = '0.55rem';

    msgLabel.style.color = '#b9b9b9';
    msgLabel.innerHTML = 'Your Message';
    msgInput.style.border = 'none';
  });

  msgInput.addEventListener('focusout', () => {
    if (!msgInput.value) {
      msgLabel.style.top = '19%';
      msgLabel.style.color = '#e6e6e6';
      msgLabel.style.fontSize = '0.81rem';
    }
  });

  // Send message
  button.addEventListener('click', () => {
    if (!nameInput.value) {
      nameLabel.style.color = '#FF3C3C';
      nameLabel.innerHTML = 'This field is required';
      nameInput.style.border = '0.5px solid #FF3C3C';

      return;
    }

    if (!emailInput.value) {
      emailLabel.style.color = '#FF3C3C';
      emailLabel.innerHTML = 'This field is required';
      emailInput.style.border = '0.5px solid #FF3C3C';

      return;
    }

    if (!msgInput.value) {
      msgLabel.style.color = '#FF3C3C';
      msgLabel.innerHTML = 'This field is required';
      msgInput.style.border = '0.5px solid #FF3C3C';

      return;
    }

    (async () => {
      const url =
        window.location.protocol === 'https:'
          ? 'https://tommyhoang.herokuapp.com/contact/send-message/'
          : 'http://tommyhoang.herokuapp.com/contact/send-message/';

      button.innerHTML = 'Sending...';

      const res = await axios.post(url, {
        name: nameInput.value,
        email: emailInput.value,
        msg: msgInput.value,
      });

      if (res.data.status === 400) {
        emailLabel.style.color = '#FF3C3C';
        emailLabel.innerHTML = 'Email does not exist';
        emailInput.style.border = '0.5px solid #FF3C3C';

        button.innerHTML = 'Send Message';

        return;
      }

      if (res.data.status === 200) {
        nameInput.value = '';
        emailInput.value = '';
        msgInput.value = '';

        emailLabel.style.top = '46%';
        emailLabel.style.color = '#e6e6e6';
        emailLabel.style.fontSize = '0.81rem';

        nameLabel.style.top = '46%';
        nameLabel.style.color = '#e6e6e6';
        nameLabel.style.fontSize = '0.81rem';

        msgLabel.style.top = '19%';
        msgLabel.style.color = '#e6e6e6';
        msgLabel.style.fontSize = '0.81rem';

        button.innerHTML = 'Send Message';

        // Show success message
        const success = getElemet('#success');

        success.style.display = 'initial';

        // Unshow message after 4 seconds
        setTimeout(() => {
          success.style.display = 'none';
        }, 4000);
      }
    })();
  });
})();
