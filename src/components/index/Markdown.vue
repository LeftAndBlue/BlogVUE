<template>
  <div class="directory">
    <el-button type="" size="default" @click="openDir">打开文件夹</el-button>
    <el-tree
      :data="dataTree"
      :props="{ children: 'children', label: 'label' }"
      c
      ref="tree"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <el-tooltip
          class="item"
          effect="light"
          :content="node.label"
          placement="top"
        >
          <p class="treeNode">{{ node.label }}</p>
        </el-tooltip>
      </template>
    </el-tree>
  </div>
  <div class="md">
    <div v-html="result" class="markdown-body"></div>
  </div>
</template>

<script setup lang="ts">
import "github-markdown-css";
import mdTOC from "markdown-it-toc-done-right";
import mdAnchor from "markdown-it-anchor";
import { ref } from "vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";
import { ElMessageBox } from "element-plus";
interface TreeNode {
  id: string;
  label: string;
  handle: any;
  children?: TreeNode[];
}

const dataTree = ref<TreeNode[]>([]);
let result = ref("");
let Book = ref("");
// Tree node clicking event
const handleNodeClick = async (data: TreeNode) => {
  let reMd = /(\.md)$/i;
  if (reMd.test(data.label)) {
    // console.log(data.handle);
    // 得到FileReader对象。
    let reader = new FileReader();
    // 读取文件中的内容，执行读文件函数，设置编码格式。
    reader.readAsText(await data.handle.getFile(), "UTF-8");
    // 这里使用箭头函数，那么里面的this就是vm，就可以使用this.textarea。
    reader.onload = (e) => {
      const md = new MarkdownIt({
        highlight: function highlight(str: string, lang: string) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                "</code></pre>"
              );
            } catch (__) {}
          }

          // 使用默认的Markdown高亮行为
          return '<pre class="hljs"><code>' + str + "</code></pre>";
        },
      });
      md.use(mdTOC);
      md.use(mdAnchor);
      let content: string = e.target?.result;
      result.value = md.render(content);
      // console.log(result);
    };
  } else {
    ElMessageBox.alert("不支持这个格式,只支持md格式");
  }
};

const openDir = async () => {
  const dirHandle: any = await showDirectoryPicker();
  const root = await handleToFileTree(dirHandle);
  dataTree.value = [root];
};

const handleToFileTree = async (handle: any): Promise<TreeNode> => {
  const result: TreeNode = {
    id: handle.name,
    label: handle.name,
    handle: handle,
  };

  if (handle.kind !== "file") {
    result.children = [];
    for await (const entry of handle.values()) {
      const child = await handleToFileTree(entry);
      result.children.push(child);
    }
  }
  return result;
};

// Because browsers limit the use of showDirectoryPicker, you may need to trigger it manually
const showDirectoryPicker = async () => {
  const handle = await window.showDirectoryPicker();
  return handle;
};
</script>

<style scoped>
/* .el-tree {
    max-width: 200px;
    margin-top: 20px;
  } */
.treeNode {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.directory {
  float: left;
  position: fixed;
  margin-top: 10px;
  max-width: 200px;
  max-height: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
  border: #ccc solid 1px;
}
.md {
  margin-left: 220px;
  margin-right: 200px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 20px;
  border: #e0d9d9 solid 1px;
}
</style>
