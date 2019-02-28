package store.createapp.android.apicloud;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.res.ColorStateList;
import android.content.res.Configuration;
import android.database.ContentObserver;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.hardware.SensorManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;
import android.view.OrientationEventListener;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ProgressBar;
import android.widget.TextView;
import com.uzmap.pkg.openapi.ExternalActivity;
import com.uzmap.pkg.openapi.Html5EventListener;
import com.uzmap.pkg.openapi.WebViewProvider;
import com.uzmap.pkg.uzcore.uzmodule.UZModuleContext;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 使用SuperWebview的Activity，需继承自ExternalActivity
 *
 * @author dexing.li
 */
public class WebPageModule extends ExternalActivity {

    private final String TAG = WebPageModule.class.getSimpleName();

    private boolean isInit = false;
    private boolean lastShowNav;

    private ProgressBar mProgress;

    /**
     * 获取当前屏幕高度(px)
     *
     * @param context
     * @return 当前屏幕高度(px)
     */
    private int getScreenHeight(Context context) {
        return context.getResources().getDisplayMetrics().heightPixels;
    }

    /**
     * 获取设备的状态栏高度(px)
     *
     * @param context
     * @return 设备的状态栏高度(px)
     */
    private int getScreenStatusBarHeight(Context context) {
        //获取status_bar_height资源的ID
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            //根据资源ID获取响应的尺寸值
            return context.getResources().getDimensionPixelSize(resourceId);
        }
        return -1;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        View androidContent = findViewById(Window.ID_ANDROID_CONTENT);
        androidContent.addOnLayoutChangeListener(new View.OnLayoutChangeListener() {
            @Override
            public void onLayoutChange(View v, int left, int top, int right, int bottom,
                                       int oldLeft, int oldTop, int oldRight, int oldBottom) {
                boolean isShowNav = getScreenHeight(WebPageModule.this) - getScreenStatusBarHeight(WebPageModule.this) == v.getHeight();
                if (isInit && lastShowNav == isShowNav) {
                    return;
                }
                isInit = true;
                lastShowNav = isShowNav;
                screenChange();
            }
        });

        mProgress = new ProgressBar(this, null, android.R.attr.progressBarStyleHorizontal);
        mProgress.setMax(100);
        mProgress.setVisibility(View.GONE);
        addContentView(mProgress, new LayoutParams(LayoutParams.MATCH_PARENT, 3));
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        screenChange();
    }

    private void screenChange() {
        sendEventToH5("screenSizeChange", new JSONObject());
    }

    /**
     * 重写该函数，可实现处理收到来自Html5页面的操作请求，处理完毕后异步回调至Html5
     */
    @Override
    protected boolean onHtml5AccessRequest(WebViewProvider provider, UZModuleContext moduleContext) {
        String name = moduleContext.optString("name");
        //"requestEvent"与assets/widget/html/wind.html页面的发送请求相匹配
        if ("requestEvent".equals(name)) {
            JSONObject extra = new JSONObject();
            try {
                extra.put("value", "哈哈哈，我是来自Native的事件");
            } catch (Exception e) {
                ;
            }
            //"fromNative"与assets/widget/html/wind.html页面的apiready中注册的监听相对应
            sendEventToHtml5("fromNative", extra);
            return true;
        }
        defaultHandleHtml5AccessRequest(moduleContext);
        return true;
    }

    /**
     * 重写该函数，可实现处理某Html5页面开始加载时，执行相应的逻辑
     */
    @Override
    protected void onPageStarted(WebViewProvider provider, String url, Bitmap favicon) {
        //远程Url，加载较慢
        if (url.startsWith("http")) {
            showProgress();
        }
    }

    /**
     * 重写该函数，可实现处理某Html5页面结束加载时，执行相应的逻辑
     */
    @Override
    protected void onPageFinished(WebViewProvider provider, String url) {
        //远程Url，加载较慢
        if (url.startsWith("http")) {
            mProgress.setProgress(100);
            hidenProgress();
        }
        ;
    }

    /**
     * 重写该函数，可实现处理某Html5页面加载进度发生变化时，执行相应的逻辑
     */
    @Override
    protected void onProgressChanged(WebViewProvider provider, int newProgress) {
        //远程Url，加载较慢，显示进度，提升体验
        mProgress.setProgress(newProgress);
        if (100 == newProgress) {
            hidenProgress();
        }
    }

    /**
     * 重写该函数，可实现处理某Html5页面dom的title标签发生变化时，执行相应的逻辑
     */
    @Override
    protected void onReceivedTitle(WebViewProvider provider, String title) {
        ;
    }

    /**
     * 重写该函数，可实现处理拦截某Html5页面是否允许访问某API，如模块的API，APICloud引擎的API
     */
    @Override
    protected boolean shouldForbiddenAccess(String host, String module, String api) {

        return false;
    }

    /**
     * 重写该函数，可实现处理当某Webview即将加载某Url时，是否进行拦截，拦截后，该Webview将不继续加载该Url
     */
    @Override
    protected boolean shouldOverrideUrlLoading(WebViewProvider provider, String url) {
        if (url.contains("taobao")) {
            showAlert("不允许访问淘宝！");
            return true;
        }
        return false;
    }

    //默认处理收到收到来自Html5页面的操作请求，并通过UZModuleContext给予JS回调
    private void defaultHandleHtml5AccessRequest(final UZModuleContext moduleContext) {
        String name = moduleContext.optString("name");
        Object extra = moduleContext.optObject("extra");
        AlertDialog.Builder dia = new AlertDialog.Builder(this, AlertDialog.THEME_HOLO_LIGHT);
        dia.setTitle("提示消息");
        dia.setMessage("收到来自Html5页面的操作请求，访问的名称标识为：\n[" + name + "]\n传入的参数为：\n[" + extra + "]\n\n" + "是否处理？\n");
        dia.setCancelable(false);
        dia.setPositiveButton("不处理", null);
        dia.setNegativeButton("处理", new OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                JSONObject json = new JSONObject();
                try {
                    json.put("result0", "value0");
                    json.put("result1", "value1");
                    json.put("result2", "value2");
                } catch (Exception e) {
                    ;
                }
                moduleContext.success(json, true);
            }
        });
        dia.show();
    }

    private void showAlert(String message) {
        AlertDialog.Builder dia = new AlertDialog.Builder(this, AlertDialog.THEME_HOLO_LIGHT);
        dia.setTitle("提示消息");
        dia.setMessage(message);
        dia.setCancelable(false);
        dia.setPositiveButton("确定", new OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                ;
            }
        });
        dia.show();
    }

    private void showProgress() {
        mProgress.setVisibility(View.VISIBLE);
    }

    private void hidenProgress() {
        new Handler().postDelayed(new Runnable() {

            @Override
            public void run() {
                if (mProgress.isShown()) {
                    mProgress.setVisibility(View.GONE);
                }
            }
        }, 1500);
    }

}
