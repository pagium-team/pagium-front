<div id="addPageBox" class="modal" style="top:35%;">
    <div class="modal-content">
        <form class="col s12 right-alert">
            <div class="row">
                <div class="input-field col s12">
                    <input id="pageName" type="text" v-model="pageName" placeholder="">
                    <label for="pageName">页面名称</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="pageDesc" type="text" v-model="pageDesc" placeholder="">
                    <label for="pageDesc">页面描述</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <input id="pageTitle" type="text" v-model="pageTitle" placeholder="">
                    <label for="pageTitle">页面 title</label>
                </div>
            </div>
            <div class="row">
                <div style="margin: 10px;">
                    <label style="font-size: 1rem;">页面 meta</label>
                    <div id="metaPannel" class="cl-editPanel"></div>
                </div>
            </div>
            <div class="row">
                <div style="margin: 10px;">
                    <select id="pageType">
                        <option disabled selected>页面类型</option>
                        <option value="pc">pc</option>
                        <option value="wap">wap</option>
                    </select>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="confirm();">
        	确定<i class="mdi-content-save right"></i>
        </button>
        <button class="btn waves-effect waves-light" style="margin-left: 10px;" type="button" name="action" v-on:click="cancle();">
        	取消<i class="mdi-action-highlight-remove right"></i>
        </button>
    </div>
</div>