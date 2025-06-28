<script setup lang="ts">
import { User } from '@/models/user.model';
import { defineProps } from 'vue';

const props = defineProps<{
  users: User[],
  onUserClick: (user: User) => void,
  onDeleteUser: (id: number) => void
}>()
</script>

<template>
  <div>
    <table class="userTable">
      <thead>
        <tr>
          <th>Name / Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" @click="() => props.onUserClick(user)">
          <td>
            <div>{{ user.name }}</div>
            <div>{{ user.email }}</div>
          </td>
          <td>
            <div>{{ user.address.street }}, {{ user.address.suite }}</div>
            <div>{{ user.address.city }}, {{ user.address.zipcode }}</div>
          </td>
          <td>{{ user.phone }}</td>
          <td>
            <a :href="'http://' + user.website" target="_blank">{{ user.website }}</a>
          </td>
          <td>{{ user.company.name }}</td>
          <td>
            <button class="tableCloseBtn" @click.stop="() => props.onDeleteUser(user.id)" title="Delete">&times;</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="./UserTable.css"></style> 