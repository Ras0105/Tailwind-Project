//========================================
// ELEMENT SELECTION
// =========================================

// SIDEBAR

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");

const closeBtn =
    document.getElementById("closeBtn");

const overlay =
    document.getElementById("overlay");


// CHAT

const sendBtn =
    document.getElementById("sendBtn");

const messageInput =
    document.getElementById("messageInput");

const chatArea =
    document.getElementById("chatArea");

const newChatBtn =
    document.getElementById("newChatBtn");

const chatHistory =
    document.getElementById("chatHistory");


// =========================================
// APPLICATION STATE
// =========================================

let conversations = [];

let currentConversationId = null;


// =========================================
// SAVE CONVERSATIONS
// =========================================

function saveConversations() {

    localStorage.setItem(
        "aiConversations",
        JSON.stringify(conversations)
    );

}


// =========================================
// LOAD CONVERSATIONS
// =========================================

function loadConversations() {

    

    const savedConversations =
        localStorage.getItem(
            "aiConversations"
        );


    // NO SAVED DATA

    if (!savedConversations) {

        createNewChat();

        return;

    }


    // LOAD DATA

    conversations =
        JSON.parse(savedConversations);


    // OPEN FIRST CHAT

    currentConversationId =
        conversations[0].id;


    renderSidebar();

    loadCurrentConversation();

}


// =========================================
// CREATE NEW CHAT
// =========================================

function createNewChat() {

    const newConversation = {

        id: Date.now(),

        title: `Chat ${conversations.length + 1}`,

        messages: []

    };


    // SAVE NEW CONVERSATION

    conversations.unshift(
        newConversation
    );


    // SET ACTIVE CHAT

    currentConversationId =
        newConversation.id;


    // SAVE

    saveConversations();


    // UPDATE UI

    renderSidebar();

    clearChatArea();

}


// =========================================
// RENDER SIDEBAR
// =========================================

function renderSidebar() {

    // CLEAR OLD SIDEBAR

    chatHistory.innerHTML = "";


    conversations.forEach(
        (conversation) => {

            const chatItem =
                document.createElement("div");


            chatItem.className = `
                bg-zinc-800
                p-3
                rounded-lg
                cursor-pointer
                hover:bg-zinc-700
                transition
            `;


            // ACTIVE CHAT STYLE

            if (
                conversation.id ===
                currentConversationId
            ) {

                chatItem.classList.add(
                    "border",
                    "border-blue-500"
                );

            }


            // CHAT TITLE

            chatItem.textContent =
                conversation.title;


            // CLICK EVENT

            chatItem.addEventListener(
                "click",
                () => {

                    currentConversationId =
                        conversation.id;

                    renderSidebar();

                    loadCurrentConversation();

                }
            );


            // APPEND

            chatHistory.appendChild(
                chatItem
            );

        }
    );

}


// =========================================
// GET CURRENT CONVERSATION
// =========================================

function getCurrentConversation() {

    return conversations.find(
        (conversation) =>
            conversation.id ===
            currentConversationId
    );

}


// =========================================
// CLEAR CHAT AREA
// =========================================

function clearChatArea() {

    chatArea.innerHTML = "";

}


// =========================================
// LOAD CURRENT CONVERSATION
// =========================================

function loadCurrentConversation() {

    clearChatArea();


    const currentConversation =
        getCurrentConversation();


    if (!currentConversation) return;


    // EMPTY CHAT STATE

    if (
        currentConversation.messages.length === 0
    ) {

        const emptyState =
            document.createElement("div");


        emptyState.className = `
            h-full
            flex
            items-center
            justify-center
            text-zinc-500
            text-2xl
            font-semibold
        `;


        emptyState.textContent =
            "What's on your mind? 😄";


        chatArea.appendChild(
            emptyState
        );


        return;

    }


    currentConversation.messages.forEach(
        (message) => {

            renderMessage(
                message.sender,
                message.text
            );

        }
    );

}


// =========================================
// RENDER MESSAGE
// =========================================

function renderMessage(sender, text) {

    const wrapper =
        document.createElement("div");


    // ALIGNMENT

    wrapper.className =
        sender === "user"
        ? "flex justify-end"
        : "flex";


    // MESSAGE BOX

    const message =
        document.createElement("div");


    message.className =
        sender === "user"
        ? `
            bg-blue-600
            p-4
            rounded-2xl
            max-w-2xl
        `
        : `
            bg-zinc-800
            p-4
            rounded-2xl
            max-w-2xl
        `;


    // TEXT

    message.textContent = text;


    // APPEND

    wrapper.appendChild(message);

    chatArea.appendChild(wrapper);


    // AUTO SCROLL

    chatArea.scrollTop =
        chatArea.scrollHeight;

}


// =========================================
// SHOW TYPING INDICATOR
// =========================================

function showTypingIndicator() {

    const typingWrapper =
        document.createElement("div");


    typingWrapper.className = "flex";

    typingWrapper.id =
        "typingIndicator";


    const typingMessage =
        document.createElement("div");


    typingMessage.className = `
        bg-zinc-800
        p-4
        rounded-2xl
        max-w-2xl
        animate-pulse
    `;


    typingMessage.textContent =
        "AI is typing...";


    typingWrapper.appendChild(
        typingMessage
    );

    chatArea.appendChild(
        typingWrapper
    );


    // AUTO SCROLL

    chatArea.scrollTop =
        chatArea.scrollHeight;

}


// =========================================
// REMOVE TYPING INDICATOR
// =========================================

function removeTypingIndicator() {

    const typingIndicator =
        document.getElementById(
            "typingIndicator"
        );


    if (typingIndicator) {

        typingIndicator.remove();

    }

}


// =========================================
// SEND MESSAGE
// =========================================

function sendMessage() {

    const message =
        messageInput.value.trim();


    // EMPTY MESSAGE

    if (message === "") return;


    // CURRENT CONVERSATION

    const currentConversation =
        getCurrentConversation();


    if (!currentConversation) return;


    // USER MESSAGE OBJECT

    const userMessage = {

        sender: "user",

        text: message

    };


    // SAVE MESSAGE

    currentConversation.messages.push(
        userMessage
    );

    // REMOVE EMPTY STATE

    chatArea.innerHTML = "";
    
    // RENDER

    renderMessage(
        "user",
        message
    );


    // SAVE STORAGE

    saveConversations();


    // CLEAR INPUT

    messageInput.value = "";


    // TYPING INDICATOR

    showTypingIndicator();


    // FAKE AI RESPONSE

    setTimeout(() => {

        removeTypingIndicator();


        const aiReply =
            "I received your message 😄";


        // AI MESSAGE OBJECT

        const aiMessage = {

            sender: "ai",

            text: aiReply

        };


        // SAVE

        currentConversation.messages.push(
            aiMessage
        );


        // RENDER

        renderMessage(
            "ai",
            aiReply
        );


        // SAVE STORAGE

        saveConversations();

    }, 1500);

}


// =========================================
// SIDEBAR EVENTS
// =========================================

// OPEN SIDEBAR

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.remove(
            "-translate-x-full"
        );

        overlay.classList.remove(
            "hidden"
        );

    }
);


// CLOSE SIDEBAR

closeBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.add(
            "-translate-x-full"
        );

        overlay.classList.add(
            "hidden"
        );

    }
);


// CLOSE USING OVERLAY

overlay.addEventListener(
    "click",
    () => {

        sidebar.classList.add(
            "-translate-x-full"
        );

        overlay.classList.add(
            "hidden"
        );

    }
);


// =========================================
// CHAT EVENTS
// =========================================

// SEND BUTTON

sendBtn.addEventListener(
    "click",
    sendMessage
);


// ENTER KEY

messageInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


// NEW CHAT BUTTON

newChatBtn.addEventListener(
    "click",
    createNewChat
);


// =========================================
// INITIALIZE APP
// =========================================

loadConversations();
