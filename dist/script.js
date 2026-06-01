    // =========================
    // SIDEBAR
    // =========================

    const sidebar = document.getElementById("sidebar");

    const menuBtn = document.getElementById("menuBtn");

    const closeBtn = document.getElementById("closeBtn");

    const overlay = document.getElementById("overlay");

    menuBtn.addEventListener("click", () => {

        sidebar.classList.remove("-translate-x-full");

        overlay.classList.remove("hidden");

    });

    closeBtn.addEventListener("click", () => {

        sidebar.classList.add("-translate-x-full");

        overlay.classList.add("hidden");

    });

    overlay.addEventListener("click", () => {

        sidebar.classList.add("-translate-x-full");

        overlay.classList.add("hidden");

    });


    // =========================
    // CHAT SYSTEM
    // =========================

    const sendBtn = document.getElementById("sendBtn");

    const messageInput = document.getElementById("messageInput");

    const chatArea = document.getElementById("chatArea");


    // SEND MESSAGE FUNCTION

    function sendMessage() {

        const message = messageInput.value.trim();

        if (message === "") return;


        // =====================
        // USER MESSAGE
        // =====================

        const userWrapper = document.createElement("div");

        userWrapper.className = "flex justify-end";


        const userMessage = document.createElement("div");

        userMessage.className = `
            bg-blue-600
            p-4
            rounded-2xl
            max-w-2xl
        `;

        userMessage.textContent = message;

        userWrapper.appendChild(userMessage);

        chatArea.appendChild(userWrapper);


        // CLEAR INPUT

        messageInput.value = "";


        // =====================
        // FAKE AI RESPONSE
        // =====================

        setTimeout(() => {

            const aiWrapper = document.createElement("div");

            aiWrapper.className = "flex";


            const aiMessage = document.createElement("div");

            aiMessage.className = `
                bg-zinc-800
                p-4
                rounded-2xl
                max-w-2xl
            `;

            aiMessage.textContent =
                "I received your message 😄";


            aiWrapper.appendChild(aiMessage);

            chatArea.appendChild(aiWrapper);


            // AUTO SCROLL

            chatArea.scrollTop = chatArea.scrollHeight;

        }, 500);


        // AUTO SCROLL

        chatArea.scrollTop = chatArea.scrollHeight;

    }


    // =========================
    // EVENTS
    // =========================

    sendBtn.addEventListener("click", sendMessage);


    messageInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    });

