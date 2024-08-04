  <template>
    <section>
        <div class="columns is-flex is-justify-content-center">
            <div class="column is-3 mt-6 has-text-centered">
                <img :src="imager('pictures/install/iphone.jpg')" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    auth: false,
    head() {
        return {
            title: "آموزش نصب نرم افزار",
        };
    },
    data() {
        return {
            device: 1
        }
    },
}
</script>