<template>
  <div class="p-5 md:p-0">
    <div class="container">
      {{ selectData }}
      <div v-for="(hotel, index) in hotels" :key="index">
        <div class="bg-gray-100 p-6 rounded-2xl mb-5">
          <h1 class="text-xl font-bold mb-4">
            {{ hotelName }}<span class="text-sm font-normal ml-2">( {{ hotel.city }})</span>
          </h1>
          <strong class="font-bold mr-3"
            >Giriş Tarihi: <span class="font-normal">{{ selectData.start_date | formatDate('DD.MM.YYYY') }}</span></strong
          >
          <strong class="font-bold mr-3"
            >Çıkış Tarihi: <span class="font-normal">{{ selectData.end_date | formatDate('DD.MM.YYYY') }}</span></strong
          >
          <strong class="font-bold mr-3"
            >Yetişkin :<span class="font-normal">{{ selectData.adult }}</span></strong
          >
          <strong class="font-bold mr-3"
            >Çocuk: <span class="font-normal">{{ selectData.child }}</span></strong
          >
        </div>
        <section class="mb-5">
          <h1 class="text-xl font-bold mb-4 border-b border-gray-100 pb-3">Oda Tipi Seçimi</h1>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-5">
            <div v-for="room in hotel.room_type" :key="room.id">
              <input :id="'room_type_id' + room.id" v-model="selectData.room_type" type="radio" name="roomSelect" class="hidden peer" @change="setHotelRoomValue(room.id, room.price)" />
              <label :for="'room_type_id' + room.id" class="peer-checked:!border-2 peer-checked:border-green-600 block border border-gray-200 rounded-md p-6">
                <h3 class="text-lg font-bold mb-3">{{ room.title }}</h3>
                <img :src="room.photo" alt="" class="rounded-md w-full mb-3" />
                <div class="flex justify-between items-center w-full text-md">
                  <div class="flex flex-col justify-center items-start">
                    <span class="font-normal -mb-1">5 gün</span>
                    <span class="fontnormal">2 Yetişkin</span>
                  </div>
                  <strong class="text-xl">{{ room.price }} TL</strong>
                </div>
                <!-- {{ room.price }} -->
              </label>
            </div>
          </div>
        </section>
        <section class="mb-5">
          <h1 class="text-xl font-bold mb-4 border-b border-gray-100 pb-3">Manzara Seçimi</h1>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-5">
            <div v-for="scenic in hotel.room_scenic" :key="scenic.id">
              <input :id="'room_scenic_id_' + scenic.id" v-model="selectData.room_scenic" type="radio" name="scenic" class="hidden peer" @change="setHotelRoomScenicValue(scenic.id)" />
              <label :for="'room_scenic_id_' + scenic.id" class="peer-checked:!border-2 peer-checked:border-green-600 block border border-gray-200 rounded-md p-6">
                <h3 class="text-lg font-bold mb-3">{{ scenic.title }}</h3>
                <img :src="scenic.photo" alt="" class="rounded-md w-full mb-3" />
                <strong class="flex justify-between items-center w-full text-md">
                  Fiyat Etki Oranı: <span class="text-xl">+{{ scenic.price_rate }}%</span></strong
                >
              </label>
            </div>
          </div>
        </section>
      </div>
      <div class="flex justify-between items-center bg-gray-100 p-6 rounded-2xl mb-5">
        <button class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white" @click="$router.go(-1)">Geri</button>
        <button class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white">Kaydet ve Devam Et</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectData: {},
      hotels: [],
      hotelName: null,
      room_type: null,
      room_scenic: null,
    }
  },
  async fetch() {
    if (process.client) {
      const dataLocal = await JSON.parse(localStorage.getItem('dataLocal'))

      if (dataLocal) {
        this.selectData = dataLocal
        try {
          await this.$axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details?id=${dataLocal.hotel_id}`).then((response) => {
            this.hotels = response.data
          })
          if (dataLocal.hotel_id) this.beforeHotelSelectDisable = false
        } catch (error) {}
      }
    }
    if (process.client) {
      this.hotelName = await JSON.parse(localStorage.getItem('isHotelName'))
    }
  },
  fetchOnServer: false,

  methods: {
    setHotelRoomValue(value, price) {
      this.selectData.room_type = value
      this.selectData.price = price
    },
    setHotelRoomScenicValue(value) {
      this.selectData.room_scenic = value
    },
  },
}
</script>
