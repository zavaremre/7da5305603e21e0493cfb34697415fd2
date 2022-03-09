<template>
  <div class="p-5 md:p-0">
    <div class="container">
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
              <input
                :id="'room_type_id' + room.id"
                v-model="selectData.room_type"
                type="radio"
                :value="selectData.room_type"
                name="roomSelect"
                class="hidden peer"
                @change="
                  setRoomPrice(room.price)
                  setHotelRoomValue(room.id, room.price)
                  setRoomName(room.title)
                "
              />
              <label :for="'room_type_id' + room.id" class="peer-checked:!border-2 peer-checked:border-green-600 block border border-gray-200 rounded-md p-6 cursor-pointer">
                <h3 class="text-lg font-bold mb-3">{{ room.title }}</h3>
                <img :src="room.photo" alt="" class="rounded-md w-full mb-3" />
                <div class="flex justify-between items-center w-full text-md">
                  <div class="flex flex-col justify-center items-start">
                    <span class="font-normal -mb-1">{{ days }} gün</span>
                    <span class="fontnormal">2 Yetişkin</span>
                  </div>
                  <strong class="text-xl">{{ formatPrice(room.price) }} TL</strong>
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
              <input
                :id="'room_scenic_id_' + scenic.id"
                v-model="selectData.room_scenic"
                type="radio"
                :value="selectData.room_scenic"
                name="scenic"
                class="hidden peer"
                @change="
                  setroomScenicName(scenic.title)
                  setHotelRoomScenicValue(scenic.id)
                  setPriceRate(scenic.price_rate)
                "
              />
              <label :for="'room_scenic_id_' + scenic.id" class="peer-checked:!border-2 peer-checked:border-green-600 block border border-gray-200 rounded-md p-6 cursor-pointer">
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
        {{ room_type }}
        {{ room_scenic }}
        <button class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white" :class="{ 'pointer-events-none opacity-40': !(selectData.room_type || selectData.room_scenic) }" @click="send">Kaydet ve Devam Et</button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      selectData: {},
      hotels: [],
      hotelName: null,
      room_type: null,
      room_scenic: null,
      roomScenicName: null,
      roomName: null,
      price: null,
      priceRate: null,
      roomPrice: null,
      buttonDisable: true,
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
  computed: {
    watchSetRatePrice() {
      return this.setPrice()
    },
    days() {
      if (!this.selectData.start_date || !this.selectData.end_date) {
        return 0
      }
      return dayjs(this.selectData.end_date).diff(dayjs(this.selectData.start_date), 'days')
    },
  },
  methods: {
    async send() {
      if (process.client) {
        localStorage.setItem('dataLocal', JSON.stringify(this.selectData))
        localStorage.setItem('hotels', JSON.stringify(this.hotels))
        localStorage.setItem('isHotelName', JSON.stringify(this.hotelName))
        localStorage.setItem('roomScenicName', JSON.stringify(this.roomScenicName))
        localStorage.setItem('roomName', JSON.stringify(this.roomName))
        localStorage.setItem('priceRate', JSON.stringify(this.priceRate))
        localStorage.setItem('hotelCity', JSON.stringify(this.hotels[0].city))
        localStorage.setItem('days', JSON.stringify(this.days))
        localStorage.setItem('roomPrice', JSON.stringify(this.roomPrice))
      }
      await this.$store.commit('global/stateSelectData', this.selectData)
      this.$router.push('/payment')
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    setRatePrice(value) {
      this.selectData.price = value
    },
    setHotelRoomValue(value) {
      this.selectData.room_type = value
    },
    setRoomName(value) {
      this.roomName = value
    },
    setHotelRoomScenicValue(value) {
      this.selectData.room_scenic = value
    },
    setroomScenicName(value) {
      this.roomScenicName = value
    },
    setRoomPrice(value) {
      this.roomPrice = value
      this.roomPrice = value
      this.selectData.price = value
    },
    setPriceRate(value) {
      this.priceRate = value
    },
  },
}
</script>
