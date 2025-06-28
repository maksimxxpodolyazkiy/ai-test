<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserModal from './components/UserModal.vue'
import UserTable from './components/UserTable.vue'
import type { User } from './models/user.model'

const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const modalOpen = ref(false)

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  users.value = await res.json()
}

function handleUserClick(user: User) {
  selectedUser.value = user
  modalOpen.value = true
}

function handleModalClose() {
  modalOpen.value = false
  selectedUser.value = null
}

function handleDeleteUser(id: number) {
  users.value = users.value.filter(u => u.id !== id)
  if (selectedUser.value && selectedUser.value.id === id) handleModalClose()
}

onMounted(fetchUsers)
</script>

<template>
  <div>
    <div>
      <header class="center-header">
        <h1>
          User Manager
        </h1>
      </header>
      <UserTable :users="users" :onUserClick="handleUserClick" :onDeleteUser="handleDeleteUser" />
    </div>
    <UserModal :user="selectedUser" :open="modalOpen" :onClose="handleModalClose" />
  </div>
</template>
