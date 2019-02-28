package store.createapp.android.apicloud;

import android.app.Application;
import com.uzmap.pkg.openapi.APICloud;
import com.uzmap.pkg.uzkit.request.APICloudHttpClient;

public class ApicloudStarer {
    public static void setup(Application application) {
        APICloud.initialize(application);//初始化APICloud，SDK中所有的API均需要初始化后方可调用执行
        //初始化APICloud网络请求框架，如果不需要则忽略，具体使用方式见MainActivity中的Case
        APICloudHttpClient.createInstance(application);
    }
}
