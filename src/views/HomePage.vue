<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Tugas 3 Crypto Tracker</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-toolbar>
        <ion-buttons slot="end"> <ion-button @click="refreshData()">
            REFRESH
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list v-if="cryptos.length > 0">
        <ion-item lines="none" class="table-header"> <div class="header-grid">
            <span>Rank</span>
            <span>Nama</span>
            <span>Symbol</span>
            <span>Harga (USD)</span>
          </div>
        </ion-item>

        <ion-item v-for="crypto in cryptos" :key="crypto.id" lines="full">
          <div class="data-row-grid">
            <span>{{ crypto.rank }}</span>
            <span>{{ crypto.name }}</span>
            <span>{{ crypto.symbol }}</span>
            <span>$ {{ parseFloat(crypto.price_usd).toFixed(2) }}</span>
          </div>
        </ion-item>
      </ion-list>
      <div v-else class="ion-text-center ion-padding">
        <p v-if="isLoading">Memuat data cryptocurrency...</p>
        <p v-else>Tidak ada data cryptocurrency yang tersedia. Coba refresh.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// ... (script bagian ini tidak berubah)
import { defineComponent, ref } from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel, // IonLabel tidak lagi digunakan di header atau data row grid, tetapi tetap bisa disertakan jika diperlukan di komponen lain.
  IonButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import axios from 'axios';
import { CryptoData, TickerResponse } from '@/interfaces/Crypto';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    // IonLabel, // Komentari atau hapus jika tidak digunakan secara langsung
    IonButton,
    IonButtons,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    const cryptos = ref<CryptoData[]>([]);
    const isLoading = ref(false);

    const fetchCryptos = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get<TickerResponse>('https://api.coinlore.net/api/tickers/');
        cryptos.value = response.data.data;
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
      } finally {
        isLoading.value = false;
      }
    };

    fetchCryptos();

    const refreshData = () => {
      fetchCryptos();
    };

    const handleRefresh = async (event: CustomEvent) => {
      await fetchCryptos();
      event.detail.complete();
    };

    return {
      cryptos,
      isLoading,
      refreshData,
      handleRefresh,
    };
  },
});
</script>

<style scoped>
/* Basic styling for grid layout */
/* Sesuaikan grid-template-columns untuk mengatur lebar kolom */
.header-grid, .data-row-grid {
  display: grid;
  /* Contoh: 0.7fr untuk Rank, 1.5fr untuk Nama, 0.8fr untuk Symbol, 1.5fr untuk Harga (USD) */
  grid-template-columns: 0.7fr 1.5fr 0.8fr 1.5fr;
  gap: 10px; /* Jarak antar kolom */
  width: 100%; /* Pastikan grid mengambil lebar penuh */
  align-items: center; /* Pusatkan vertikal */
  padding: 5px 0;
}

.table-header {
  --background: var(--ion-color-light); /* Warna latar belakang untuk header */
  border-bottom: 1px solid var(--ion-color-step-150); /* Garis bawah */
  font-weight: bold; /* Teks header lebih tebal */
  padding: 10px 16px; /* Padding untuk header item */
}

/* Memastikan span dalam grid tidak wrap kecuali perlu */
.header-grid span, .data-row-grid span {
  white-space: nowrap; /* Mencegah teks wrapping */
  overflow: hidden; /* Sembunyikan overflow */
  text-overflow: ellipsis; /* Tambahkan ellipsis jika teks terlalu panjang */
  display: block; /* Pastikan span adalah block element untuk overflow/ellipsis bekerja */
}

/* Penyesuaian padding untuk ion-item agar sesuai dengan grid */
ion-item {
  --padding-start: 16px;
  --inner-padding-end: 16px;
}

/* Jika ada masalah font atau ukuran pada mobile, bisa tambahkan ini */
ion-title {
  font-size: 1.2em; /* Contoh penyesuaian ukuran font title */
}
</style>