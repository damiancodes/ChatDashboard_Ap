import { randomUUID } from 'crypto';

export class MemStorage {
  constructor() {
    this.messageIdCounter = 5;
    // define-ocg: Initialize with sample messages for the optimal chat group demonstration
    this.messages = [
      { id: 1, user: "Alice", message: "Hey team, morning!", timestamp: "2025-08-06T08:01:00Z" },
      { id: 2, user: "Bob", message: "Morning Alice!", timestamp: "2025-08-06T08:01:15Z" },
      { id: 3, user: "Charlie", message: "Anyone up for lunch later?", timestamp: "2025-08-06T08:02:00Z" },
      { id: 4, user: "Alice", message: "Count me in.", timestamp: "2025-08-06T08:02:10Z" },
      { id: 5, user: "Bob", message: "Same here!", timestamp: "2025-08-06T08:02:20Z" }
    ];
  }

  async getRecentMessages(limit = 5) {
    return this.messages.slice(-limit);
  }

  async addMessage(insertMessage) {
    this.messageIdCounter++;
    const message = {
      id: this.messageIdCounter,
      ...insertMessage,
      timestamp: insertMessage.timestamp || new Date().toISOString(),
    };
    this.messages.push(message);
    return message;
  }
}

export const storage = new MemStorage();
