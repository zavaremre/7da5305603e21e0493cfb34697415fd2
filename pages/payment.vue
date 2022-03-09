<template>
  <div class="p-5 md:p-0">
    <div class="container">
      <div v-if="!end" class="mb-4 md:mb-0">
        <div class="flex flex-col justify-center items-center w-full mb-4 p-5 bg-green-700 bg-opacity-10 rounded-lg">
          <h1 class="text-lg font-bold mb-3">Rezarvasyon kaydınız alınmıştır</h1>
          <p class="text-md text-center mb-3">Rezarvasyon özetiniz aşağıdaki gibidir.Rezarvasyon kaydında değişiklik veya yeni rezarvasyon yapmak için aşağıdaki linkleri kullanbilirisniz</p>
          <div class="flex flex-col md:flex-row gap-x-4">
            <button class="bg-blue-800 rounded-2xl py-1.5 px-7 mb-4 md:mb-0 text-white" @click="removeLocalStroge">Yeni Rezarvasyon Yap</button>
            <button class="bg-blue-800 rounded-2xl py-1.5 px-7 mb-4 md:mb-0 text-white" @click="$router.go(-1)">Rezarvasyonu Güncelle</button>
            <button class="bg-blue-800 rounded-2xl py-1.5 px-7 mb-4 md:mb-0 text-white" @click="deleted">Rezarvasyonu İptal Et</button>
          </div>
          <small v-if="isdelete" class="block bg-green-400 bg-opacity-40 text-green-500 border border-green-600 rounded-md text-center font-bold text-md mb-4 w-full p-3">Rezarvasyon Kaydınız Silinmiştir.</small>
        </div>
      </div>
      <div class="flex flex-wrap gap-x-5 mb-4">
        <div v-if="!end" class="basis-[45%]">
          <section class="border border-gray-200 rounded-md p-5 mb-4">
            <div class="flex items-center justify-center w-full h-full">
              <div class="max-w-md px-8 py-8 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-lg">
                <div class="flex w-full items-center justify-between">
                  <p class="text-xl font-semibold leading-tight text-white">Parkdaki Bank</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9.99975C16 13.6369 14.605 17.0796 12.071 19.6958C11.688 20.0916 11.054 20.1025 10.657 19.7207C10.454 19.5253 10.352 19.264 10.352 19.0038C10.352 18.7546 10.445 18.5043 10.633 18.3109C12.804 16.0676 14 13.1164 14 9.99975C14 6.88307 12.804 3.9319 10.633 1.68861C10.248 1.29478 10.259 0.662674 10.657 0.278822C11.054 -0.102039 11.688 -0.0920689 12.071 0.304744C14.605 2.92092 16 6.36362 16 9.99975ZM11 10.0002C11 7.57944 9.999 5.22648 8.252 3.54451C7.854 3.16365 7.221 3.17362 6.838 3.57043C6.454 3.96525 6.465 4.59835 6.862 4.98021C8.221 6.2873 9 8.11683 9 10.0002C9 11.8836 8.221 13.7131 6.862 15.0202C6.659 15.2156 6.557 15.4768 6.557 15.738C6.557 15.9873 6.65 16.2375 6.838 16.43C7.221 16.8268 7.854 16.8368 8.252 16.4559C9.999 14.7739 11 12.421 11 10.0002ZM4.597 6.53723C5.501 7.47143 6 8.70076 6 9.99987C6 11.299 5.501 12.5283 4.597 13.4625C4.213 13.8583 3.58 13.8693 3.183 13.4874C2.979 13.292 2.877 13.0308 2.877 12.7696C2.877 12.5203 2.971 12.2701 3.158 12.0777C4.244 10.956 4.244 9.04373 3.158 7.92209C2.774 7.52826 2.785 6.89615 3.183 6.5123C3.58 6.13044 4.213 6.14141 4.597 6.53723ZM1 9.0033C1.552 9.0033 2 9.44897 2 10.0003C2 10.5517 1.552 10.9973 1 10.9973C0.448 10.9973 0 10.5517 0 10.0003C0 9.44897 0.448 9.0033 1 9.0033Z" fill="white" />
                  </svg>
                </div>
                <p class="text-base font-medium leading-3 text-white mt-16">{{ selectData.card_name }}</p>
                <p class="text-2xl font-semibold leading-4 text-white mt-4">{{ selectData.card_number }}</p>
                <div class="flex items-center mt-10">
                  <p class="text-xl leading-tight text-white">{{ selectData.card_date_month }}&nbsp;/&nbsp;{{ selectData.card_date_year }}</p>
                  <div class="flex items-center pl-24 sm:pl-48">
                    <div class="flex items-center pr-2">
                      <div class="w-5 h-5 bg-red-600 rounded-full z-10"></div>
                      <div class="w-5 h-5 bg-yellow-500 -ml-2 z-0 rounded-full"></div>
                    </div>
                    <p class="text-sm font-semibold leading-3 text-white">mastercard</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="border border-gray-200 rounded-md p-5 mb-4 md:mb-0">
            <div class="flex flex-col justify-center items-start w-full text-left mb-4">
              <label class="text-sm font-bold text-gray-400" for="card_name">Kartın üzerindeki isim</label>
              <input id="card_name" v-model="selectData.card_name" class="border border-gray-200 p-3 rounded-md text-sm text-gray-700 w-full" type="text" placeholder="Kartın üzerindeki isim" />
            </div>

            <div class="flex flex-col justify-center items-start w-full text-left">
              <label class="text-sm font-bold text-gray-400" for="card_number">Kart Numarası</label>
              <input id="card_number" v-model="selectData.card_number" class="border border-gray-200 p-3 rounded-md text-sm text-gray-700 w-full" type="number" placeholder="Kart Numarası" />
            </div>

            <h5 class="text-sm font-bold text-gray-400 mt-5 mb-5 md:mb-0">Kart Son Kullanma Tarihi</h5>
            <div class="flex">
              <div class="flex flex-col justify-center items-start w-full text-left mr-4">
                <label class="text-sm font-bold text-gray-400" for="card_date_month">Ay</label>
                <select id="card_date_month" v-model="selectData.card_date_month" class="border border-gray-200 p-3 rounded-md text-sm text-gray-700 w-full" name="month">
                  <option value="" disabled selected>Ay</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
              </div>
              <div class="flex flex-col justify-center items-start w-full text-left mr-4">
                <label class="text-sm font-bold text-gray-400" for="card_date_year">Yıl</label>
                <select id="card_date_year" v-model="selectData.card_date_year" class="border border-gray-200 p-3 rounded-md text-sm text-gray-700 w-full" name="year">
                  <option value="" selected disabled>Yıl</option>
                  <option value="2022">22</option>
                  <option value="2023">23</option>
                  <option value="2024">24</option>
                  <option value="2025">25</option>
                  <option value="2026">26</option>
                  <option value="2027">27</option>
                  <option value="2028">28</option>
                  <option value="2029">29</option>
                  <option value="2030">30</option>
                  <option value="2031">31</option>
                  <option value="2032">32</option>
                  <option value="2033">33</option>
                  <option value="2034">34</option>
                  <option value="2035">35</option>
                  <option value="2036">36</option>
                  <option value="2037">37</option>
                  <option value="2038">38</option>
                  <option value="2039">39</option>
                  <option value="2040">40</option>
                  <option value="2041">41</option>
                  <option value="2042">42</option>
                  <option value="2043">43</option>
                  <option value="2044">44</option>
                  <option value="2045">45</option>
                  <option value="2046">46</option>
                  <option value="2047">47</option>
                  <option value="2048">48</option>
                  <option value="2049">49</option>
                </select>
              </div>
              <div class="flex flex-col justify-center items-start w-full text-left">
                <label class="text-sm font-bold text-gray-400" for="card_cvv">CVV</label>
                <input id="card_cvv" v-model="selectData.card_cvv" class="border border-gray-200 p-3 rounded-md text-sm text-gray-700 w-full" type="number" max="3" placeholder="CVV" />
              </div>
            </div>
          </section>
        </div>
        <div class="flex-1">
          <div class="bg-gray-200 rounded-md p-5">
            <h1 class="text-xl font-bold mb-4">
              {{ hotelName }}<span class="text-sm font-normal ml-2">( {{ hotelCity }})</span>
            </h1>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Giriş Tarihi </strong>
                <span class="font-normal text-md">{{ selectData.start_date | formatDate('DD.MM.YYYY') }}</span>
              </div>
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Çıkış Tarihi </strong>
                <span class="font-normal text-md">{{ selectData.end_date | formatDate('DD.MM.YYYY') }}</span>
              </div>
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Yetişkin </strong>
                <span class="font-normal text-md">{{ selectData.adult }}</span>
              </div>
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Çocuk </strong>
                <span class="font-normal text-md">{{ selectData.child }}</span>
              </div>
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Oda Tipi </strong>
                <span class="font-normal text-md">{{ roomName }}</span>
              </div>
              <div class="flex flex-col justify-center items-center bg-white rounded-md p-4">
                <strong class="font-bold text-md"> Manzara </strong>
                <span class="font-normal text-md">{{ roomScenicName }}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-full mb-4">
              <input v-model="couponCode" type="text" placeholder="Kupon Kodu" class="bg-white rounded-md px-4 py-2.5 h-full w-full" />
              <button class="bg-blue-600 py-1.5 px-5 rounded-md text-white h-full whitespace-nowrap" @click="coupon(couponCode)">Kodu Kullan</button>
            </div>
            <small v-if="message" class="block bg-red-400 bg-opacity-40 text-red-500 border border-red-600 rounded-md text-center font-bold text-md mb-4 w-full p-3">Böyle bir kupon kodu yok</small>
            <small v-if="couponDate" class="block bg-red-400 bg-opacity-40 text-red-500 border border-red-600 rounded-md text-center font-bold text-md mb-4 w-full p-3">Bu kodun son kullanma tarihi geçmiş</small>
            <small v-if="expiration_at && !(couponDate && message)" class="block bg-green-400 bg-opacity-40 text-green-500 border border-green-600 rounded-md text-center font-bold text-md mb-4 w-full p-3">Kupon Kodu Uygulandı</small>

            <div class="flex flex-col justify-center items-center bg-white rounded-md p-4 rounded-b-none">
              <strong class="flex justify-between items-center w-full font-bold text-md py-2">
                Oda Fiyatı : <span class="font-normal text-md">{{ formatPrice(roomPrice) }} TL</span>
              </strong>
              <strong class="flex justify-between items-center w-full font-bold text-md py-2">
                Fiyat Etki Oranı :<span class="font-normal text-md"> %{{ priceRate }}</span></strong
              >
              <strong class="flex justify-between items-center w-full font-bold text-md py-2">
                Konaklama({{ days }} Gün) : <span class="font-normal text-md">{{ formatPrice(selectData.price * days) }} TL</span></strong
              >
              <strong v-if="discount_ammount" class="flex justify-between items-center w-full font-bold text-md py-2">
                İndirim({{ couponCode ? couponCode : '' }}) : <span class="font-normal text-md">-{{ discount_ammount }} TL</span>
              </strong>
            </div>
            <div class="flex flex-col justify-center items-center bg-white rounded-md p-6 border-t border-gray-200 rounded-t-none">
              <strong class="font-bold text-md text-center"> TOPLAM TUTAR</strong>
              <strong v-if="!discount_ammount" class="font-bold text-2xl text-center">{{ formatPrice(selectData.price * days * (priceRate / 100 + 1)) }} TL</strong>
              <strong v-if="discount_ammount" class="font-bold text-2xl text-center">{{ formatPrice(selectData.price * days * (priceRate / 100 + 1) - discount_ammount) }} TL</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center bg-gray-100 p-6 rounded-2xl mb-5 mt-5">
        <button class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white" @click="$router.go(-1)">Geri</button>
        <button class="bg-blue-800 rounded-2xl py-1.5 px-7 text-white" :class="{ 'pointer-events-none opacity-40': !(selectData.card_name && selectData.card_number && selectData.card_date_month && selectData.card_date_year && selectData.card_cvv) }" @click="send">Ödeme Yap Bitir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      hotels: [],
      selectData: {},
      hotelName: null,
      roomScenicName: null,
      roomName: null,
      priceRate: null,
      hotelCity: null,
      days: null,
      roomPrice: null,
      couponCode: null,
      discount_ammount: null,
      message: false,
      expiration_at: null,
      today: '2022-03-08',
      end: false,
      isdelete: false,
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
      this.roomScenicName = await JSON.parse(localStorage.getItem('roomScenicName'))
      this.roomName = await JSON.parse(localStorage.getItem('roomName'))
      this.priceRate = await JSON.parse(localStorage.getItem('priceRate'))
      this.hotels = await JSON.parse(localStorage.getItem('hotels'))
      this.hotelCity = await JSON.parse(localStorage.getItem('hotelCity'))
      this.days = await JSON.parse(localStorage.getItem('days'))
      this.roomPrice = await JSON.parse(localStorage.getItem('roomPrice'))
    }
  },
  fetchOnServer: false,
  computed: {
    watchselectData() {
      return this.selectData
    },
    couponDate() {
      if (this.expiration_at) {
        const t = this.$moment(this.today).format('YYYYDDMM')
        const e = this.$moment(this.expiration_at).format('YYYYDDMM')
        const dateMat = t - e
        if (dateMat <= 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
  },
  methods: {
    send() {
      this.end = true
      try {
        this.$axios.post(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings`, this.selectData).then((response) => {
          this.selectData.id = response.data.id
        })
      } catch (error) {}
    },
    async deleted() {
      this.end = true
      try {
        await this.$axios.delete(`https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings/${this.selectData.id}`)
        this.isdelete = true
      } catch (error) {}
    },
    async coupon(value) {
      try {
        await this.$axios.get(`https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=${value}`).then((response) => {
          if (response.data.length) {
            this.discount_ammount = response.data[0].discount_ammount
            this.expiration_at = response.data[0].expiration_at
          } else {
            this.message = true
          }
        })
      } catch (error) {}
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    removeLocalStroge() {
      localStorage.clear()
      this.$router.push('/')
      window.location.href = '/'
    },
  },
}
</script>

<style lang="scss" scoped></style>
