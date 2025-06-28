<script setup lang="ts">
import { defineProps, onMounted, onUnmounted } from 'vue';
import type { User } from '../models/user.model';

const props = defineProps<{
  user: User | null,
  open: boolean,
  onClose: () => void
}>()

function handleClose(e: MouseEvent) {
  if (e.target === e.currentTarget) props.onClose()
}

function onEsc(e: KeyboardEvent) {
  if (props.open && e.key === 'Escape') props.onClose()
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
})
</script>

<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div
        v-if="open"
        class="overlay"
        @click="handleClose"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal" @click.stop>
          <button class="closeBtn" @click="props.onClose" title="Close" aria-label="Close dialog">&times;</button>
          <div v-if="user">
            <div>
              <div>{{ user.name }}</div>
              <a :href="'mailto:' + user.email">{{ user.email }}</a>
            </div>
            <div>
              <div>Address</div>
              <div>{{ user.address.street }}, {{ user.address.suite }}</div>
              <div>{{ user.address.city }}, {{ user.address.zipcode }}</div>
              <a :href="`https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`" target="_blank">
                <span>📍</span>View on map
              </a>
            </div>
            <div>
              <div>Contact</div>
              <div><span>Phone:</span> <a :href="'tel:' + user.phone">{{ user.phone }}</a></div>
              <div><span>Website:</span> <a :href="'http://' + user.website" target="_blank">{{ user.website }}</a></div>
            </div>
            <div>
              <div>Company</div>
              <div><span>Name:</span> {{ user.company.name }}</div>
              <div><span>Catchphrase:</span> {{ user.company.catchPhrase }}</div>
              <div><span>Business:</span> {{ user.company.bs }}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style src="./UserModal.css"></style> 