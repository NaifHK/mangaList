<template>
    <header class="shadow-sm bg-slate-900">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">MangaList</NuxtLink>
        <ul class="flex gap-4">
          <li class=""><NuxtLink to="/">Tracker</NuxtLink></li>
          <li class=""><NuxtLink to="/manga">manga</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div>
      <slot />
    </div>

</template>

<style scoped>
</style>
