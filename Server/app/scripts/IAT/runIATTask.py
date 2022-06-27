# -*-coding:utf-8-*-
import os
import uuid
import json
from logzero import logger
from python_on_whales import docker
from slugify import slugify
from datetime import datetime, timedelta

from app.utils.util import clear_project_file
from app.utils.minio_tools import upload_file_to_minio_server
from jtl import create_parser
from jmeter_api.thread_groups.common_thread_group.elements import CommonThreadGroup
from jmeter_api.configs import *
from jmeter_api.configs.http_request_defaults.elements import Argument, Implementation
from jmeter_api.configs.http_header_manager.elements import Header
from jmeter_api.non_test_elements.test_plan.elements import TestPlan
from jmeter_api.samplers import HttpRequest, Method, Protocol
from jmeter_api.basics.sampler.elements import UserDefinedVariables, FileUpload
from jmeter_api.pre_processors import *
from jmeter_api.post_processors import *
from jmeter_api.assertions import *
from jmeter_api.assertions.duration.elements import DurationAssertion, Scope
from jmeter_api.assertions.response.elements import TestField, TestType
from jmeter_api.listeners import ViewResultsTree

from app import db, create_app

app = create_app()


class IATTask:
    def __init__(self, task_id, exec_id):
        self.exec_id = exec_id
        self.task_id = task_id
        self.uu_id = f'{task_id}_{uuid.uuid4().hex}'
        self.task_info = {}
        self.work_dir = None
        self.timeout = 60000
        self.jmx_file = 'test_plan.jmx'
        self.result_file = 'result.csv'
        self.log_file = 'run.log'
        self.output_file = 'report.xml'

    def get_task_info(self):
        logger.info("get_task_info")
        self.task_info = {
            'id': 1,
            'task_name': '接口测试任务',
            'task_type': 1,
            'project_id': 1,
            'add_user': 2,
            'update_user': 1,
            'share_cookie': True,
            'env_info': {
                'protocol': 'http',
                'domain': '192.168.0.101',
                'port': 5000,
                'headers': [{
                    'name': 'conssstent-type',
                    'value': 'xxxxxx',
                }],
                'proxy': {
                    'scheme': '',
                    'host': '',
                    'port': 0,
                    'username': '',
                    'password': '',
                },
                'hosts':[],
                # 'hosts': [{
                #     'ip': '192.168.0.133',
                #     'domain': 'api.test.com',
                # }],
                'global_params': [{
                    'key': 'username',
                    'value': 'xxxxxx',
                    'type': 'text/plain',
                }],
            },
            'case_list': [{
                'id': 123,
                'case_name': '测试用例1',
                'method': Method.GET,
                'protocol': Protocol.HTTP,
                'host': '',
                'path': '/api/test',
                'encoding': 'UTF-8',
                'port': None,
                'headers': [{
                    'name': 'x-token',
                    'value': 'dafsdfdsffsadfasgdsafads',
                }],
                'params': [{
                    'name': 'user_id',
                    'value': 'dsfsdfdsf',
                    'type': 'text/plain',
                }],
                'body': '',
                'file': [],
                # 'file': [{
                #     'file_path': 'dfasdfasd/dfadf.png',
                #     'param_name': 'dfadf.png',
                #     'mime_type': 'text/plain',
                # }],
                'preShell': [{
                    'name': '前置处理一些脚本',
                    'language': ScriptLanguage.JAVA,
                    'script': 'var a = "test";',
                }],
                'postShell': [{
                    'name': '后置处理一些脚本',
                    'language': ScriptLanguage.JAVA,
                    'script': 'var a = "test";',
                }],
                'asserts': [],
                'extracts': [],
                # 'asserts': [{
                #     'type': 'ResponseAssertion',
                #     'name': '返回内容校验',
                #     'enabled': True,
                #     'test_field': TestField.RESPONSE_BODY,
                #     'test_type': TestType.EQUALS,
                #     'patterns': ['code'],
                # }, {
                #     'type': 'JSONPathAssertion',
                #     'name': 'json路径断言',
                #     'enabled': True,
                #     'json_path': '$.code',
                #     'expected_value': '0',
                # }, {
                #     'type': 'DurationAssertion',
                #     'name': '断言持续时间',
                #     'enabled': True,
                #     'duration': 123,
                # }, ],
                # 'extracts': [{
                #     'type': 'JSONPostProcessor',
                #     'name': 'JSON提取器',
                #     'enabled': True,
                #     'referenceNames': 'testaatestaa',
                #     'jsonPathExprs': 'testaat.estaa',
                # },{
                #     'type': 'RegexExtractor',
                #     'name': '正则表达式提取器',
                #     'enabled': True,
                #     'var_name': 'testaatestaa',
                #     'field_to_check': Field.BODY,
                #     'regex': 'ssdfdaa',
                # },]
            }],
        }

    def build_workspace_dir(self, work_dir):
        logger.info("build_workspace_dir")
        if os.path.exists(work_dir):
            logger.error(f"工作文件夹已存在：{work_dir}")
            return False
        os.makedirs(work_dir)
        return True

    def build_jmx(self):
        test_plan = TestPlan(name=self.task_info['task_name'])
        test_thread_group = CommonThreadGroup(name='TestThreadGroup')
        test_thread_group.append(HTTPCacheManager(clear_each_iteration=True))
        test_thread_group.append(HTTPRequestDefaults(
            protocol=self.task_info['env_info']['protocol'],
            domain=self.task_info['env_info']['domain'],
            port=self.task_info['env_info']['port'],
            implementation=Implementation.HTTP,
            connect_timeout=self.timeout,
            response_timeout=self.timeout,
            arguments=[Argument(name=item['name'], value=item['value'], content_type=item['type']) for item in self.task_info['env_info']['global_params']]
        ))
        test_thread_group.append(HTTPHeaderManager(
            headers=[Header(name=item['name'], value=item['value']) for item in self.task_info['env_info']['headers']]
        ))
        test_thread_group.append(HTTPCookieManager())
        for case in self.task_info['case_list']:
            # 用例基础数据
            case_name = slugify(case['case_name'], allow_unicode=True)
            format_case_name = f"{case['id']}_{case_name}"
            http_sampler = HttpRequest(
                host=case['host'],
                protocol=case['protocol'],
                port=case['port'],
                path=case['path'],
                browser_comp_headers=True,
                name=format_case_name,
                content_encoding=case['encoding'],
                method=case['method'],
                proxy_scheme=self.task_info['env_info']['proxy']['scheme'],
                proxy_host=self.task_info['env_info']['proxy']['host'],
                proxy_port=self.task_info['env_info']['proxy']['port'],
                proxy_username=self.task_info['env_info']['proxy']['username'],
                proxy_password=self.task_info['env_info']['proxy']['password'],
            )
            # 用例请求头
            http_sampler.append(
                HTTPHeaderManager(headers=[Header(name=item['name'], value=item['value']) for item in case['headers']])
            )
            # 用例参数
            for param in case['params']:
                http_sampler.add_user_variable(
                    UserDefinedVariables(name=param['name'], value=param['value'], content_type=param['type'])
                )
            # 用例body
            if case['body']:
                http_sampler.add_body_data(case['body'])
            # 用例文件上传
            for param in case['file']:
                http_sampler.add_file_upload(
                    FileUpload(file_path=param['file_path'], param_name=param['param_name'], mime_type=param['mime_type']))
            # 前置处理脚本
            for shell in case['preShell']:
                http_sampler.append(
                    JSR223PreProcessor(
                        name=shell['name'],
                        script_language=shell['language'],
                        script=shell['script']
                    )
                )
            # 后置处理脚本
            for shell in case['postShell']:
                http_sampler.append(
                    JSR223PreProcessor(
                        name=shell['name'],
                        script_language=shell['language'],
                        script=shell['script']
                    )
                )

            # 断言
            for assertion in case['asserts']:
                if assertion['type'] == 'ResponseAssertion':
                    http_sampler.append(
                        ResponseAssertion(
                            name=assertion['name'],
                            is_enabled=assertion['enabled'],
                            test_field=assertion['test_field'],
                            test_type=assertion['test_type'],
                            patterns=assertion['patterns']
                        )
                    )
                elif assertion['type'] == 'JSONPathAssertion':
                    http_sampler.append(
                        JSONAssertion(
                            name=assertion['name'],
                            is_enabled=assertion['enabled'],
                            json_path=assertion['json_path'],
                            expected_value=assertion['expected_value'],
                            validation=True,
                        )
                    )
                elif assertion['type'] == 'DurationAssertion':
                    http_sampler.append(
                        DurationAssertion(
                            name=assertion['name'],
                            is_enabled=assertion['enabled'],
                            duration=assertion['duration'],
                        )
                    )
            # 提取
            for extract in case['extracts']:
                if extract['type'] == 'JSONPostProcessor':
                    http_sampler.append(
                        JSONExtractor(
                            name=extract['name'],
                            is_enabled=extract['enabled'],
                            referenceNames=extract['referenceNames'],
                            jsonPathExprs=extract['jsonPathExprs'],
                        )
                    )
                elif extract['type'] == 'RegexExtractor':
                    http_sampler.append(
                        RegExpPost(
                            name=extract['name'],
                            is_enabled=extract['enabled'],
                            var_name=extract['var_name'],
                            field_to_check=extract['field_to_check'],
                            regexp=extract['regex'],
                        )
                    )
            test_thread_group.append(
                http_sampler
            )
        test_plan.append(test_thread_group)

        # 查看结果树
        test_plan.append(
            ViewResultsTree(
                name="TestViewResultsTree",
                filename=f'/opt/jmeter/{self.output_file}',
                xml=True,
                request_headers=True,
                response_data=True,
                encoding=True,
                assertions=True,
                response_headers=True,
                sampler_data=True,
                save_assertion_results_failure_message=True,
                response_data_on_error=True,
            )
        )

        with open(f'{self.work_dir}/{self.jmx_file}', 'w', encoding='utf-8') as f:
            f.write(test_plan.to_xml())

    def run_task(self):
        logger.info("run task!")
        docker.run(
            "justb4/jmeter:latest",
            ["-n", "-t", "/opt/jmeter/test_plan.jmx", "-l", "/opt/jmeter/result.jtl", "-J", "httpclient4.request_sent_retry_enabled=1", "-J", "httpclient4.retrycount=2"],
            name=f"jmeter_{self.uu_id}",
            volumes=[(self.work_dir, '/opt/jmeter')],
            remove=True,
            add_hosts=[(item['domain'], item['ip']) for item in self.task_info['env_info']['hosts']]
        )

    def analysis_log(self):
        total_count = 0
        pass_count = 0
        fail_count = 0
        fail_cases = []
        exec_round_time = 0
        output_file = '{}/{}'.format(self.work_dir, self.output_file)
        if not os.path.isfile(output_file):
            logger.error('输出文件不存在！')
            return
        logger.info('获取执行报告：{}'.format(output_file))
        parser = create_parser(output_file)
        for sample in parser.itersamples():
            name_label = sample.label.split('_')
            case_name = name_label[1::] if len(name_label) > 1 else name_label[0]
            case_id = name_label[0] if len(name_label) > 1 else None
            if not sample.success:
                fail_count += 1
                if case_id:
                    fail_cases.append(case_id)
            else:
                pass_count += 1
            total_count += 1
            exec_round_time += sample.elapsed_time.microseconds
            # case_name = sample.label
            # bj_time = sample.timestamp + timedelta(hours=8)  # UTC比北京时间提前了8个小时
            # bj_time = bj_time.strftime("%Y-%m-%d %H:%M:%S")
            # content.append({
            #     'task_id': self.task_id,
            #     'check_url': sample.url,
            #     'case_name': slugify(case_name, allow_unicode=True),
            #     'response_code': sample.response_code,
            #     'request_headers': sample.request_headers,
            #     'microseconds': sample.elapsed_time.microseconds,
            #     'result_time': bj_time,
            #     'response_data': sample.response_data,
            #     'status': sample.success,
            #     'add_time': datetime.now()
            # })
        return total_count, pass_count, fail_count, fail_cases, exec_round_time

    def save_log(self, total_count, pass_count, fail_count, fail_cases, exec_round_time):
        logger.info("save_log")
        log_file = f"{self.work_dir}/{self.output_file}"
        save_name = f"exec_result/{self.task_id}_{self.exec_id}_{self.uu_id}.xml"
        log_url = upload_file_to_minio_server(log_file, save_name)
        print(log_url)


    def task_log_notice(self, total_count, pass_count, fail_count, exec_round_time):
        logger.info("task_log_notice")

    def clean_project(self):
        logger.info("clean_project")
        clear_project_file(self.work_dir)

    def main(self):
        logger.info(self.uu_id)
        # 获取任务信息
        self.get_task_info()
        # 创建执行环境
        self.work_dir = app.root_path + '/scripts/IAT/task_file/' + self.uu_id
        if not self.build_workspace_dir(self.work_dir):
            return
        # 创建jmx
        self.build_jmx()
        # 运行测试
        run_result = self.run_task()
        # 分析日志
        total_count, pass_count, fail_count, fail_cases, exec_round_time = self.analysis_log()
        # 上传日志结果文件
        self.save_log(total_count, pass_count, fail_count, fail_cases, exec_round_time)
        # 发送消息通知
        self.task_log_notice(total_count, pass_count, fail_count, exec_round_time)
        # 清理项目
        # self.clean_project()


if __name__ == '__main__':
    IATTask('1', '2').main()