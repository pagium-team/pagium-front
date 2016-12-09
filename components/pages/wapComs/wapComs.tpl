<!--chart dashboard start-->
<div id="chart-dashboard">
    <div class="op-box">
    	<div id="input-select-g2" class="row op-wap-pulishBtnPanel">
		    <a class="btn-floating btn-small waves-effect waves-light pink op-wap-item tooltipped" v-on:click="goBack();" data-position="bottom" data-delay="50" data-tooltip="返回"><i class="mdi-navigation-arrow-back"></i></a>
		    <!-- <a class="btn-floating btn-small waves-effect waves-light pink op-wap-item tooltipped" v-on:click="preview();" data-position="bottom" data-delay="50" data-tooltip="预览"><i class="mdi-image-remove-red-eye"></i></a> -->
		    <a class="btn-floating btn-small waves-effect waves-light pink op-wap-item tooltipped" v-on:click="savePage();" data-position="bottom" data-delay="50" data-tooltip="保存"><i class="mdi-content-save"></i></a>
		    <a class="btn-floating btn-small waves-effect waves-light pink op-wap-item tooltipped" v-on:click="pulishToFTP();" data-position="bottom" data-delay="50" data-tooltip="发布"><i class="mdi-content-send"></i></a>
		</div>
        <div class="iphone">
            <iframe v-bind:src="pageUrl" frameborder="0" allowfullscreen ></iframe>
        </div>
        <div class="card op-content" style="overflow-y: visible;">
            <c-coms></c-coms>
        </div>
    </div>
</div>