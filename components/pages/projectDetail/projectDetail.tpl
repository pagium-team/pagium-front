<!--chart dashboard start-->
<div id="chart-dashboard">
    <div id="input-select" class="pd-back-btn-panel">
        <div class="row">
            <form id="addProjectFileForm" method="post" enctype="multipart/form-data">
                <div class="file-field input-field pd-fileBox">
                    <div class="btn col s1">
                        <span>选择项目</span>
                        <input id="projectFile" type="file" name="projectFile" multiple>
                    </div>
                    <div class="file-path-wrapper col s4">
                        <input class="file-path validate" name="projectFile" type="text" placeholder="请选择工程">
                    </div>
                    <a class="waves-effect waves-light btn brown lighten-1 col s1"
                       v-on:click="uploadProjectFile();">确认上传</a>
                    <button class="btn waves-effect waves-light col s1" type="button" style="margin-left: 10px" name="action" v-on:click="goBack();">返回
                        <i class="mdi-action-assignment-return left"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="card pd-content">
        <c-pages></c-pages>
    </div>
</div>