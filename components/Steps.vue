<template>
  <div class="px-5 md:p-0 mt-4 md:mb-4">
    <div class="container">
      <section class="relative steps bg-gray-100 p-5 rounded-2xl">
        <div class="relative flex flex-nowrap md:flex-wrap justify-between w-full z-20 overflow-x-scroll md:overflow-hidden">
          <router-link to="/" class="step relative flex flex-col justify-center items-center min-w-[50%] md:min-w-[33%] basis-1/2 md:basis-1/3" :class="{ 'text-gray-300': $route.name === 'index' || $route.name === 'hotel-select' }">
            <div class="flex flex-col justify-center items-center">
              <div class="icon relative flex justify-center items-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-gray-400 bg-white z-10 mb-3" :class="{ '!border-gray-200 !bg-gray-50': $route.name === 'index' || $route.name === 'hotel-select' }">
                <img :src="require('~/assets/images/icons/calendar-week.svg')" class="w-5 md:w-8" alt="" :class="{ 'opacity-30': $route.name === 'index' || $route.name === 'hotel-select' }" />
              </div>
              <div class="title text-xs md:text-md font-semibold text-center">Otel ve Tarih <br />Seçimi</div>
            </div>
            <div class="divider hidden md:block absolute top-14 left-36 h-px w-full bg-gray-300"></div>
          </router-link>
          <router-link to="/hotel-select" class="step relative flex flex-col justify-center items-center min-w-[50%] md:min-w-[33%] basis-1/2 md:basis-1/3" :class="{ 'text-gray-300': $route.name === 'hotel-select' }">
            <div class="flex flex-col justify-center items-center">
              <div class="icon relative flex justify-center items-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-gray-400 bg-white z-10 mb-3" :class="{ '!border-gray-200 !bg-gray-50': $route.name === 'hotel-select' }">
                <img :src="require('~/assets/images/icons/door-open.svg')" class="w-5 md:w-8" alt="" :class="{ 'opacity-30': $route.name === 'hotel-select' }" />
              </div>
              <div class="title text-xs md:text-md font-semibold text-center">Oda Tipi ve Manzara <br />Seçimi</div>
            </div>
            <div class="divider hidden md:block absolute top-14 left-36 h-px w-full bg-gray-300"></div>
          </router-link>
          <router-link to="/payment" class="step relative flex flex-col justify-center items-center min-w-[50%] md:min-w-[33%] basis-1/2 md:basis-1/3" :class="{ 'text-gray-300': $route.name === 'payment' }">
            <div class="flex flex-col justify-center items-center">
              <div class="icon relative flex justify-center items-center w-16 h-16 md:w-24 md:h-24 rounded-full border border-gray-400 bg-white z-10 mb-3" :class="{ '!border-gray-200 !bg-gray-50': $route.name === 'payment' }">
                <img :src="require('~/assets/images/icons/credit-card-2-front.svg')" class="w-5 md:w-8" alt="" :class="{ 'opacity-30': $route.name === 'payment' }" />
              </div>
              <div class="title text-xs md:text-md font-semibold text-center">Önizleme ve Ödeme <br />İşlemleri</div>
            </div>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>
