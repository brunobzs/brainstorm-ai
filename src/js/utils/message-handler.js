export class MessageHandler {
  constructor(chatContainer) {
    this.chatContainer = chatContainer;
    this.messageHistory = [];
  }

  showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'bot-message', 'loading');
    loadingDiv.textContent = 'Typing...';
    this.chatContainer.appendChild(loadingDiv);
    return loadingDiv;
  }

  displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.innerHTML = DOMPurify.sanitize(marked.parse(message));
    this.chatContainer.appendChild(messageDiv);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;

    this.messageHistory.push({
      role: sender === 'user' ? 'user' : 'model',
      parts: [{ text: message }]
    });
  }

  getHistory() {
    return this.messageHistory;
  }
}
