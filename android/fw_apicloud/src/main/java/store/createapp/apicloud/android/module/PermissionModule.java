package store.createapp.apicloud.android.module;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import androidx.core.content.ContextCompat;
import com.uzmap.pkg.uzcore.UZWebView;
import com.uzmap.pkg.uzcore.uzmodule.ModuleResult;
import com.uzmap.pkg.uzcore.uzmodule.UZModule;
import com.uzmap.pkg.uzcore.uzmodule.UZModuleContext;
import com.yanzhenjie.permission.Action;
import com.yanzhenjie.permission.AndPermission;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.*;

public class PermissionModule extends UZModule {

    private static Map<String, String[]> permissionsMap = new HashMap<String, String[]>();

    static {
        permissionsMap.put("camera", new String[]{Manifest.permission.CAMERA});
        permissionsMap.put("storage", new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE});
        permissionsMap.put("contacts", new String[]{Manifest.permission.READ_CONTACTS, Manifest.permission.WRITE_CONTACTS});
    }

    private JSONArray permRS = null;
    private int requestPermissionCount = 0;

    public PermissionModule(UZWebView webView) {
        super(webView);
    }

    public ModuleResult jsmethod_hasPermission_sync(final UZModuleContext context) {
        JSONArray list = context.optJSONArray("list");

        JSONArray result = new JSONArray();
        try {
            int length = list.length();
            for (int i = 0; i < length; i++) {
                String value = list.getString(i);
                if (TextUtils.isEmpty(value)) continue;
                if (!permissionsMap.containsKey(value)) continue;
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("name", value);
                jsonObject.put("granted", isGranted(value, context.getContext()));
                result.put(i, jsonObject);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return new ModuleResult(result);
    }

    public void jsmethod_requestPermission(final UZModuleContext context) {
        permRS = new JSONArray();
        requestPermissionCount = 0;
        JSONArray list = context.optJSONArray("list");
        List<String> perms = new ArrayList<String>();
        requestPermissionCount = list.length();
        if (requestPermissionCount == 0) {
            JSONObject result = new JSONObject();
            try {
                result.put("list", new JSONArray());
            } catch (JSONException e) {
                e.printStackTrace();
            }
            context.success(result, true);
            return;
        }
        for (int i = 0; i < requestPermissionCount; i++) {
            try {
                String key = list.getString(i);
                if (!permissionsMap.containsKey(key)) continue;
                perms.addAll(new ArrayList<>(Arrays.asList(permissionsMap.get(key))));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        String[] permission = new String[perms.size()];
        permission = perms.toArray(permission);

        AndPermission.with(context.getContext())
                .runtime()
                .permission(permission)
                .onGranted(new Action<List<String>>() {
                    @Override
                    public void onAction(List<String> data) {
                        permissionResult(context, data, true);
                    }
                })
                .onDenied(new Action<List<String>>() {
                    @Override
                    public void onAction(List<String> data) {
                        permissionResult(context, data, false);
                    }
                }).start();
    }

    // 权限回调
    private void permissionResult(UZModuleContext context, List<String> permissions, boolean isGranted) {
        try {
            String[] names = parsePermissionNames(permissions);
            for (int i = 0; i < names.length; i++) {
                String value = names[i];
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("name", value);
                jsonObject.put("granted", isGranted);
                permRS.put(i, jsonObject);
            }
            if (requestPermissionCount == permRS.length()) {
                JSONObject result = new JSONObject();
                result.put("list", permRS);
                context.success(result, true);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    // 权限->map.keys
    private String[] parsePermissionNames(final List<String> permissions) {
        final Map<String, String[]> map = new HashMap<String, String[]>();
        for (Map.Entry<String, String[]> entry : permissionsMap.entrySet()) {
            for (String p : permissions) {
                if (containsString(entry.getValue(), p)) {
                    map.put(entry.getKey(), entry.getValue());
                }
            }
        }
        return map.keySet().toArray(new String[map.keySet().size()]);
    }

    // 是否允许权限
    private boolean isGranted(String key, Context context) {
        if (!permissionsMap.containsKey(key)) return false;
        String[] ps = permissionsMap.get(key);
        boolean granted = true;
        for (String p : ps) {
            if (ContextCompat.checkSelfPermission(context, p) == PackageManager.PERMISSION_DENIED) {
                granted = false;
                break;
            }
        }
        return granted;
    }

    private boolean containsString(String[] strs, String str) {
        boolean result = false;
        for (int i = 0; i < strs.length; i++) {
            if (str.equals(strs[i])) {
                result = true;
                break;
            }
        }
        return result;
    }
}
