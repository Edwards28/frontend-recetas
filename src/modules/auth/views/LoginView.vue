<script setup>
import { useAuth } from '../composables/useAuth'

const { form, login, send } = useAuth()
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div id="div-form">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">¡Bienvenido!</div>
            <span class="text-600 font-medium">Inicia sesión para continuar</span>
          </div>

          <div>
            <label for="correo_electronico" class="block text-900 text-xl font-medium mb-2"
              >Correo Electrónico</label
            >
            <InputText
              id="correo_electronico"
              type="text"
              placeholder="Correo Electrónico"
              class="w-full md:w-30rem mb-5"
              v-model.trim="form.correo_electronico"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2"
              >Contraseña</label
            >
            <Password
              id="password1"
              v-model.trim="form.contrasena"
              placeholder="Contraseña"
              :toggleMask="true"
              :feedback="false"
              class="w-full mb-5"
              inputClass="w-full"
            ></Password>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <router-link
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                :to="{ name: 'register' }"
                >¿No tienes cuenta? Regístrate</router-link
              >
            </div>

            <Button
              :loading="send"
              @click="login"
              label="Iniciar Sesión"
              class="w-full p-3 text-xl"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}
.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

#div-form {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
