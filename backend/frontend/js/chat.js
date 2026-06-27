// ============================================
// NitroVerse Chat System
// چت ساده مبتنی بر localStorage
// ============================================

(function() {
  'use strict';

  // ==========================================
  // کلیدهای localStorage
  // ==========================================
  const KEYS = {
    CHAT_MESSAGES: 'nv_chat_messages',
    CHAT_ROOM: 'nv_chat_room',
  };

  // ==========================================
  // توابع ذخیره‌سازی
  // ==========================================
  function getMessages(room = 'general') {
    try {
      const all = JSON.parse(localStorage.getItem(KEYS.CHAT_MESSAGES) || '{}');
      return all[room] || [];
    } catch {
      return [];
    }
  }

  function saveMessages(room, messages) {
    try {
      const all = JSON.parse(localStorage.getItem(KEYS.CHAT_MESSAGES) || '{}');
      all[room] = messages.slice(-100); // حداکثر ۱۰۰ پیام
      localStorage.setItem(KEYS.CHAT_MESSAGES, JSON.stringify(all));
    } catch {
      // خطا در ذخیره‌سازی
    }
  }

  function getCurrentRoom() {
    return localStorage.getItem(KEYS.CHAT_ROOM) || 'general';
  }

  function setCurrentRoom(room) {
    localStorage.setItem(KEYS.CHAT_ROOM, room);
  }

  // ==========================================
  // توابع اصلی
  // ==========================================

  function sendMessage(message, username, room) {
    room = room || getCurrentRoom();
    username = username || localStorage.getItem('nv_username') || 'کاربر';

    if (!message || message.trim() === '') {
      return { success: false, message: 'پیام نمی‌تواند خالی باشد' };
    }

    const messages = getMessages(room);
    messages.push({
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      username: username,
      message: message.trim(),
      timestamp: Date.now(),
      room: room,
    });

    saveMessages(room, messages);
    return { success: true, message: 'پیام ارسال شد' };
  }

  function getChatHistory(room, limit = 50) {
    room = room || getCurrentRoom();
    const messages = getMessages(room);
    return messages.slice(-limit);
  }

  function clearChat(room) {
    room = room || getCurrentRoom();
    saveMessages(room, []);
    return { success: true, message: 'چت پاک شد' };
  }

  function getRooms() {
    try {
      const all = JSON.parse(localStorage.getItem(KEYS.CHAT_MESSAGES) || '{}');
      return Object.keys(all);
    } catch {
      return ['general'];
    }
  }

  function createRoom(roomName) {
    roomName = roomName.trim().toLowerCase().replace(/\s+/g, '_');
    if (!roomName) return { success: false, message: 'نام اتاق نامعتبر است' };

    const rooms = getRooms();
    if (rooms.includes(roomName)) {
      return { success: false, message: 'اتاق قبلاً وجود دارد' };
    }

    saveMessages(roomName, []);
    setCurrentRoom(roomName);
    return { success: true, message: 'اتاق ایجاد شد', room: roomName };
  }

  // ==========================================
  // رندر چت
  // ==========================================

  function renderChat(containerId, room) {
    const container = document.getElementById(containerId);
    if (!container) return;

    room = room || getCurrentRoom();
    const messages = getChatHistory(room, 50);

    if (messages.length === 0) {
      container.innerHTML = `
        <div class="chat-empty" style="text-align: center; padding: 40px; color: var(--text-secondary);">
          <div style="font-size: 2rem; margin-bottom: 10px;">💬</div>
          <p>هنوز پیامی وجود ندارد. اولین پیام را تو بفرست!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = messages.map(msg => `
      <div class="chat-message" style="
        padding: 10px 14px;
        margin-bottom: 8px;
        background: rgba(255,255,255,0.04);
        border-radius: 12px;
        border-right: 3px solid ${msg.username === (localStorage.getItem('nv_username') || 'کاربر') ? '#00eaff' : 'rgba(255,255,255,0.1)'};
      ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 700; color: ${msg.username === (localStorage.getItem('nv_username') || 'کاربر') ? '#00eaff' : '#fff'};">
            ${msg.username}
          </span>
          <span style="font-size: 0.7rem; color: var(--text-secondary);">
            ${new Date(msg.timestamp).toLocaleTimeString('fa-IR')}
          </span>
        </div>
        <div style="color: var(--text-primary); word-wrap: break-word;">
          ${msg.message}
        </div>
      </div>
    `).join('');

    // اسکرول به پایین
    container.scrollTop = container.scrollHeight;
  }

  function renderRoomSelector(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const rooms = getRooms();
    const current = getCurrentRoom();

    container.innerHTML = `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; padding: 8px 0;">
        ${rooms.map(room => `
          <button class="btn btn-sm ${room === current ? 'btn-primary' : ''}" 
                  onclick="window.Chat.switchRoom('${room}')"
                  style="padding: 6px 14px; font-size: 0.8rem;">
            #${room}
          </button>
        `).join('')}
        <button class="btn btn-sm btn-purple" onclick="window.Chat.createNewRoom()" 
                style="padding: 6px 14px; font-size: 0.8rem;">
          ➕ جدید
        </button>
      </div>
    `;
  }

  function createNewRoom() {
    const name = prompt('نام اتاق جدید را وارد کنید:');
    if (!name) return;
    const result = createRoom(name);
    if (result.success) {
      renderRoomSelector('roomSelector');
      renderChat('chatContainer');
    }
    alert(result.message);
  }

  function switchRoom(room) {
    setCurrentRoom(room);
    renderRoomSelector('roomSelector');
    renderChat('chatContainer');
  }

  function sendFromInput(inputId, username) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const message = input.value;
    input.value = '';

    const result = sendMessage(message, username);
    if (result.success) {
      renderChat('chatContainer');
    } else {
      alert(result.message);
    }
  }

  // ==========================================
  // اکپورت
  // ==========================================

  window.Chat = {
    sendMessage,
    getChatHistory,
    clearChat,
    getRooms,
    createRoom,
    getCurrentRoom,
    setCurrentRoom,
    renderChat,
    renderRoomSelector,
    createNewRoom,
    switchRoom,
    sendFromInput,
    KEYS,
  };

  console.log('💬 NitroVerse Chat loaded!');
})();