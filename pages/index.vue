<template>
  <div class="p-5 md:p-0">
    <div class="container pb-4">
      <section class="steps">
        <form @submit.prevent="send">
          <div class="border border-gray-200 rounded-2xl mb-4">
            <div class="p-8">
              <select
                v-model="selectData.hotel_id"
                name="select"
                class="border border-gray-200 p-3 text-gray-800 rounded-lg w-full"
                @change="
                  selectHotel(selectData.hotel_id)
                  setHotelName(hotels[selectData.hotel_id - 1].hotel_name)
                "
              >
                <option value="0" disabled selected>Rezarvasyon yapmak istediğiniz oteli seçiniz.</option>
                <option v-for="hotel in hotels" :key="hotel.id" :disabled="hotel.disable" :selected="hotel.id === 0" :value="hotel.id" @change="setHotelName(hotel.hotel_name)">
                  {{ hotel.hotel_name }}
                </option>
              </select>
            </div>

            <div class="flex flex-col md:flex-row gap-x-4 border-t border-light-200">
              <div class="step flex flex-col justify-center items-center basis-1/4">
                <div class="flex flex-col justify-center items-center w-full p-8 border-b border-gray-200 md:border-r md:border-gray-200 h-full">
                  <label for="" class="font-bold mb-2">Giriş Tarihi</label>

                  <input v-model="selectData.start_date" type="date" min="1" :disabled="beforeHotelSelectDisable" class="border border-gray-200 p-3 text-gray-800 rounded-lg w-full" />
                </div>
              </div>
              <div class="step flex flex-col justify-center items-center basis-1/4">
                <div class="flex flex-col justify-center items-center w-full p-8 border-b border-gray-200 md:border-r md:border-gray-200 h-full">
                  <label for="" class="font-bold mb-2">Çıkış Tarihi</label>
                  <input v-model="selectData.end_date" value="" type="date" min="1" :disabled="beforeHotelSelectDisable" class="border border-gray-200 p-3 text-gray-800 rounded-lg w-full" />
                </div>
              </div>
              <div class="step flex flex-col justify-center items-center basis-1/4">
                <div class="flex flex-col justify-center items-center w-full p-8 border-b border-gray-200 md:border-r md:border-gray-200 h-full">
                  <label for="" class="font-bold mb-2">Yetişkin Sayısı</label>
                  <input v-model="selectData.adult" type="number" name="" min="1" :disabled="beforeHotelSelectDisable" class="border border-gray-200 p-3 text-gray-800 rounded-lg w-full" @change="checkAdultMaxQuota" />
                  <span v-if="max_adult_size_status" class="text-red-500 text-md">Sadece {{ max_adult_size }} kişiye izin verilir </span>
                </div>
              </div>
              <div class="step flex flex-col justify-center items-center basis-1/4">
                <div class="flex flex-col justify-center items-center w-full p-8">
                  <label for="" class="font-bold mb-2">Çocuk Sayısı</label>
                  <input v-model="selectData.child" type="number" name="" :disabled="child_status || beforeHotelSelectDisable" class="border border-gray-200 p-3 text-gray-800 rounded-lg w-full" />
                  <span v-if="child_status" class="text-red-500 text-md">Çocuklara İzin Verilmiyor.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-gray-200 p-8">
            <router-link to="/hotel-select" class="flex justify-end items-center w-full"><button :class="{ 'pointer-events-none opacity-40': !(selectData.start_date && selectData.end_date && selectData.hotel_id && selectData.adult) }" class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white" @click="send">Kaydet ve Devam Et</button></router-link>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotels: [],
      hotelName: null,
      selectData: {
        hotel_id: 0,
        start_date: '',
        end_date: '',
        adult: null,
        child: null,
        room_type: null,
        room_scenic: null,
        price: null,
        coupon_code: '',
        card_name: null,
        card_number: null,
        card_date_month: null,
        card_date_year: null,
        card_cvv: null,
      },
      max_adult_size: null,
      max_adult_size_status: false,
      child_status: false,
      beforeHotelSelectDisable: true,
    }
  },

  async fetch() {
    if (process.client) {
      const dataLocal = await JSON.parse(localStorage.getItem('dataLocal'))

      if (dataLocal) {
        this.selectData = dataLocal
        try {
          await this.$axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details?id=${dataLocal.hotel_id}`).then((response) => {
            this.selectData.hotel_id = dataLocal.hotel_id
          })
          if (dataLocal.hotel_id) this.beforeHotelSelectDisable = false
        } catch (error) {}
      }
    }
    try {
      await this.$axios.get('https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels').then((response) => {
        this.hotels = response.data
      })
    } catch (error) {}
  },
  fetchOnServer: false,

  computed: {
    adultSize() {
      if (this.max_adult_size <= this.selectData.adult) {
        return true
      } else {
        return false
      }
    },
    isChild() {
      return this.child_status
    },
    adult() {
      return this.selectData.adult
    },
  },

  watch: {
    isChild() {
      if (this.child_status === true) {
        return (this.selectData.child = 0)
      } else {
        return this.selectData.child
      }
    },
    hotelNames() {
      return this.setHotelName()
    },
  },

  async created() {},
  methods: {
    setHotelName(value) {
      this.hotelName = value
    },
    checkAdultMaxQuota() {
      this.max_adult_size_status = false
      if (this.selectData.adult > this.max_adult_size) {
        this.selectData.adult = this.max_adult_size
        this.max_adult_size_status = true
      }

      if (this.selectData.adult < 1) {
        this.max_adult_size_status = true
        this.selectData.adult = 1
      }
    },
    async send() {
      if (process.client) {
        localStorage.setItem('dataLocal', JSON.stringify(this.selectData))
        localStorage.setItem('hotels', JSON.stringify(this.hotels))
        localStorage.setItem('isHotelName', JSON.stringify(this.hotelName))
      }
      await this.$store.commit('global/stateSelectData', this.selectData)
    },
    selectHotel(id) {
      try {
        this.$axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details?id=${id}`).then((response) => {
          this.selectData.hotel_id = id
          this.child_status = response.data[0].child_status
          this.max_adult_size = response.data[0].max_adult_size
          this.beforeHotelSelectDisable = false
        })
      } catch (error) {}
    },
  },
}
</script>
