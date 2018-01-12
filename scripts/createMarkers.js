var markersArray = [];
var bus39_markers = [];
var bus68_markers = [];	
var bus55_markers = [];
var bus51_markers = [];
var bus52_markers = [];
var bus53_markers = [];
var bus66_markers = [];
var bus67_markers = [];
var bus68_markers = [];
var redLinePath;
var brownLinePath;
var yellowLinePath;
var blueLinePath;
var pinkLinePath;
var greenLinePath;

function createMarkers(arg) {
	redLinePath = [
		{lat:11.092152, lng: 106.68048139999996},
		{lat: 11.0893927, lng: 106.68114079999998},
		{lat: 11.0855253, lng: 106.68204119999996},
		{lat: 11.0826317, lng: 106.68284919999996},
		{lat: 11.0776343, lng: 106.68394609999996},
		{lat: 11.0732293, lng: 106.68497849999994},
		{lat: 11.0709744, lng: 106.68546420000007},
		{lat: 11.064997, lng: 106.68685989999994},
		{lat: 11.06441168687424, lng: 106.68709516525269},
		{lat: 11.063274508488984, lng: 106.68188095092773},
		{lat: 11.058599395434094, lng: 106.68303966522217},
		{lat: 11.053713612031656, lng: 106.68945550918579},
		{lat: 11.052323676019238, lng: 106.69140815734863},
		{lat: 11.04373119813378, lng: 106.68518543243408},
		{lat: 11.043941801089321, lng: 106.6853141784668},
		{lat: 11.0357851, lng: 106.68241310000008},
		{lat: 11.016941271240965, lng: 106.67664527893066},
		{lat:11.0111916, lng: 106.67647809999994},
		{lat: 11.0032322, lng: 106.67578219999996},
		{lat: 10.9989855, lng: 106.67511830000001},
		{lat: 10.9904112, lng: 106.67365199999995},
		{lat: 10.99057018788649, lng: 106.676344871521},
		{lat: 10.9831749, lng: 106.68008039999995},
		{lat: 10.9788409, lng: 106.68092409999997},
		{lat: 10.9740342, lng: 106.68184730000007},
		{lat: 10.9704603, lng: 106.68252860000007},
		{lat: 10.9672203, lng: 106.68308630000001},
		{lat: 10.9652186, lng: 106.68265739999993},
		{lat: 10.96179521463017, lng: 106.67501449584961},
		{lat: 10.964870857948481, lng: 106.66836261749268},
		{lat: 10.9663253, lng: 106.6689298},
		{lat: 10.970269, lng: 106.67053799999996},
		{lat: 10.972454499300357, lng: 106.6717529296875},
		{lat: 10.975993465340238, lng: 106.66943550109863}
	];
	brownLinePath = [
		new google.maps.LatLng(11.054856092382304, 106.66571795940399),
		new google.maps.LatLng(11.055137763121243, 106.66674792766571),
		new google.maps.LatLng(11.055095644149437, 106.66683912277222),
		new google.maps.LatLng(11.054695513615654, 106.66696518659592),
		new google.maps.LatLng(11.054648129700494, 106.6670161485672),
		new google.maps.LatLng(11.054732367766592, 106.6676813364029),
		new google.maps.LatLng(11.054574421372818, 106.66788518428802),
		new google.maps.LatLng(11.05334243658204, 106.6680434346199),
		new google.maps.LatLng(11.051049562222046, 106.66829824447632),
		new google.maps.LatLng(11.050828434470555, 106.66828215122223),
		new google.maps.LatLng(11.050538862162998, 106.66805148124695),
		new google.maps.LatLng(11.050407238292342, 106.66778862476349),
		new google.maps.LatLng(11.050902143739576, 106.66563212871552),
		new google.maps.LatLng(11.05147075747805, 106.66360437870026),
		new google.maps.LatLng(11.051670825012819, 106.66346490383148),
		new google.maps.LatLng(11.05262377639761, 106.66382431983948),
		new google.maps.LatLng(11.054603378218047, 106.66463166475296),
		new google.maps.LatLng(11.054840297753417, 106.66565358638763),
		new google.maps.LatLng(11.055272017303471, 106.66556507349014),
		new google.maps.LatLng(11.055745855102412, 106.66766256093979),
		new google.maps.LatLng(11.055956449433953, 106.66858524084091),
		new google.maps.LatLng(11.056267075796914, 106.67022407054901),
		new google.maps.LatLng(11.056469772483446, 106.67093083262444),
		new google.maps.LatLng(11.056959402862487, 106.67319595813751),
		new google.maps.LatLng(11.057162099070434, 106.67408913373947),
		new google.maps.LatLng(11.057422708274727, 106.67502522468567),
		new google.maps.LatLng(11.058288771542108, 106.6790109872818),
		new google.maps.LatLng(11.059110081456401, 106.68276607990265),
		new google.maps.LatLng(11.058367743749233, 106.68303966522217),
		new google.maps.LatLng(11.057609609682649, 106.68361902236938),
		new google.maps.LatLng(11.056682998716761, 106.68494939804077),
		new google.maps.LatLng(11.054603378218047, 106.68347954750061),
		new google.maps.LatLng(11.053213446422179, 106.68249249458313),
		new google.maps.LatLng(11.051607645806047, 106.68134987354279),
		new google.maps.LatLng(11.050591511694705, 106.68062031269073),
		new google.maps.LatLng(11.048896192027247, 106.6793704032898),
		new google.maps.LatLng(11.046716480919299, 106.67780935764313),
		new google.maps.LatLng(11.045774040427123, 106.6771548986435),
		new google.maps.LatLng(11.044047102510445, 106.67594522237778),
		new google.maps.LatLng(11.04362326406049, 106.67571187019348),
		new google.maps.LatLng(11.043094123273459, 106.67574942111969),
		new google.maps.LatLng(11.04218589432614, 106.67598277330399),
		new google.maps.LatLng(11.039950849388074, 106.67679011821747),
		new google.maps.LatLng(11.037249818318145, 106.67776107788086),
		new google.maps.LatLng(11.034885737603446, 106.67864084243774),
		new google.maps.LatLng(11.033595752354033, 106.6790109872818),
		new google.maps.LatLng(11.032521637866255, 106.67916119098663),
		new google.maps.LatLng(11.031463315339971, 106.67912900447845),
		new google.maps.LatLng(11.029662578700869, 106.67879641056061), 
		new google.maps.LatLng(11.027867096390478, 106.6784155368805), 
		new google.maps.LatLng(11.026276953340894, 106.67805075645447), 
		new google.maps.LatLng(11.025497674799261, 106.67786836624146),
		new google.maps.LatLng(11.023144030450608, 106.6773372888565),
		new google.maps.LatLng(11.021548596389463, 106.67695641517639),
		new google.maps.LatLng(11.019868905634832, 106.67660236358643),
		new google.maps.LatLng(11.018210267423388, 106.67622148990631),
		new google.maps.LatLng(11.0166200721693, 106.67584598064423),
		new google.maps.LatLng(11.012949952974672, 106.67508959770203),
		new google.maps.LatLng(11.011480839354501, 106.67297601699829),
		new google.maps.LatLng(11.010722584295433, 106.67184948921204),
		new google.maps.LatLng(11.008895392208341, 106.66931211948395),
		new google.maps.LatLng(11.008421478864559, 106.66877031326294),
		new google.maps.LatLng(11.004998748742425, 106.66629195213318),
		new google.maps.LatLng(11.003440076924734, 106.66503667831421),
		new google.maps.LatLng(11.002260536014601, 106.66348099708557),
		new google.maps.LatLng(11.000080479227877, 106.65958642959595),
		new google.maps.LatLng(10.998648162610387, 106.65806293487549),
		new google.maps.LatLng(10.997310625367827, 106.65676474571228),
		new google.maps.LatLng(10.996067868790965, 106.6563355922699),
		new google.maps.LatLng(10.994403830596394, 106.65584206581116),
		new google.maps.LatLng(10.993413828734719, 106.65590643882751),
		new google.maps.LatLng(10.993124199902216, 106.6553646326065),
		new google.maps.LatLng(10.992745049000712, 106.6562283039093),
		new google.maps.LatLng(10.99244488752471, 106.65783762931824),
		new google.maps.LatLng(10.992281641681451, 106.66001558303833),
		new google.maps.LatLng(10.992034139746785, 106.66156589984894),
		new google.maps.LatLng(10.991291632696797, 106.66271388530731),
		new google.maps.LatLng(10.99093880954284, 106.66306793689728),
		new google.maps.LatLng(10.990359546733213, 106.66344344615936),
		new google.maps.LatLng(10.989643365687142, 106.66379749774933),
		new google.maps.LatLng(10.988595421170675, 106.66437149047852),
		new google.maps.LatLng(10.987305233111691, 106.66498303413391),
		new google.maps.LatLng(10.9859939749784, 106.66564285755157),
		new google.maps.LatLng(10.984198226476625, 106.6661524772644),
		new google.maps.LatLng(10.982555186019324, 106.66653871536255),
		new google.maps.LatLng(10.981080654746899, 106.66702151298523),
		new google.maps.LatLng(10.97866872700763, 106.66812658309937),
		new google.maps.LatLng(10.975466836173679, 106.66976809501648),
		new google.maps.LatLng(10.9758088, 106.67049629999997)
	];
	
	blueLinePath = [
		new google.maps.LatLng(11.054850827506097, 106.6656468808651),
		new google.maps.LatLng(11.055129865814488, 106.66671574115753),
		new google.maps.LatLng(11.05512328472537, 106.66682437062263),
		new google.maps.LatLng(11.054662608119829, 106.66699469089508),
		new google.maps.LatLng(11.054735000205765, 106.66763573884964),
		new google.maps.LatLng(11.054624437740047, 106.66783690452576),
		new google.maps.LatLng(11.054440166871222, 106.66790932416916),
		new google.maps.LatLng(11.053626741223853, 106.66801661252975),
		new google.maps.LatLng(11.052826475602275, 106.6680970788002),
		new google.maps.LatLng(11.052002515625066, 106.66820973157883),
		new google.maps.LatLng(11.051036399860541, 106.66830629110336),
		new google.maps.LatLng(11.050788947354533, 106.66826605796814),
		new google.maps.LatLng(11.050557289500155, 106.66806489229202),
		new google.maps.LatLng(11.050430930593413, 106.66781812906265),
		new google.maps.LatLng(11.050459887847687, 106.66742652654648),
		new google.maps.LatLng(11.050915306107083, 106.66563212871552),
		new google.maps.LatLng(11.051365458720742, 106.66395306587219),
		new google.maps.LatLng(11.05150761203418, 106.66353464126587),
		new google.maps.LatLng(11.051678722412698, 106.66347831487656),
		new google.maps.LatLng(11.05262377639761, 106.66382431983948),
		new google.maps.LatLng(11.05385839665415, 106.6643151640892),
		new google.maps.LatLng(11.054629702620312, 106.66466116905212),
		new google.maps.LatLng(11.054842930191622, 106.66561335325241),
		new google.maps.LatLng(11.054846878848887, 106.66563212871552),
		new google.maps.LatLng(11.054848195067956, 106.66563883423805),
		new google.maps.LatLng(11.054848853177491, 106.66564285755157),
		new google.maps.LatLng(11.055281230823518, 106.66555568575859),
		new google.maps.LatLng(11.055512884946937, 106.66661247611046),
		new google.maps.LatLng(11.055703736217959, 106.66741445660591),
		new google.maps.LatLng(11.055963030504385, 106.66858792304993),
		new google.maps.LatLng(11.057146304565755, 106.67397379875183),
		new google.maps.LatLng(11.057412178614399, 106.675084233284),
		new google.maps.LatLng(11.058186107641028, 106.6785255074501),
		new google.maps.LatLng(11.058786296091863, 106.68124258518219),
		new google.maps.LatLng(11.059120611055741, 106.68276071548462),
		new google.maps.LatLng(11.057962352860285, 106.68327569961548),
		new google.maps.LatLng(11.057267395746528, 106.6841983795166),
		new google.maps.LatLng(11.056546112757642, 106.68513715267181),
		new google.maps.LatLng(11.055093011713497, 106.68723464012146),
		new google.maps.LatLng(11.05483503287692, 106.6876369714737),
		new google.maps.LatLng(11.051849832691412, 106.68546438217163),
		new google.maps.LatLng(11.05135492884294, 106.68513178825378),
		new google.maps.LatLng(11.053218711327787, 106.6824871301651),
		new google.maps.LatLng(11.050928468474005, 106.68087780475616),
		new google.maps.LatLng(11.04922262079924, 106.67963325977325),
		new google.maps.LatLng(11.047242982669948, 106.67817950248718),
		new google.maps.LatLng(11.045605559126425, 106.67701005935669),
		new google.maps.LatLng(11.043931270945139, 106.67586207389832),
		new google.maps.LatLng(11.042920375344352, 106.67571187019348),
		new google.maps.LatLng(11.041340843999858, 106.67630195617676),
		new google.maps.LatLng(11.038129104063914, 106.67743921279907),
		new google.maps.LatLng(11.034517170967243, 106.67888760566711),
		new google.maps.LatLng(11.032379475360429, 106.67925238609314),
		new google.maps.LatLng(11.03026282547304, 106.67901635169983),
		new google.maps.LatLng(11.026650795692023, 106.6782009601593),
		new google.maps.LatLng(11.025408162942666, 106.67794346809387),
		new google.maps.LatLng(11.022965005277426, 106.6773533821106),
		new google.maps.LatLng(11.01971094049372, 106.6765809059143),
		new google.maps.LatLng(11.016951802352136, 106.67594790458679),
		new google.maps.LatLng(11.013223765455404, 106.6752290725708),
		new google.maps.LatLng(11.012918359210499, 106.67513251304626),
		new google.maps.LatLng(11.00815819334407, 106.66868448257446),
		new google.maps.LatLng(11.006115089706219, 106.66730046272278),
		new google.maps.LatLng(11.00406144032686, 106.66565895080566),
		new google.maps.LatLng(11.002587016560478, 106.66399598121643),
		new google.maps.LatLng(11.001870865212148, 106.66298747062683),
		new google.maps.LatLng(10.999880376589262, 106.65954351425171),
		new google.maps.LatLng(10.997057861742649, 106.65674328804016),
		new google.maps.LatLng(10.994677660311824, 106.65600299835205),
		new google.maps.LatLng(10.992950422466183, 106.65582060813904),
		new google.maps.LatLng(10.992739783012532, 106.65549874305725),
		new google.maps.LatLng(10.992455419511488, 106.65398597717285),
		new google.maps.LatLng(10.992202651724861, 106.65339589118958),
		new google.maps.LatLng(10.991870893676216, 106.65247857570648),
		new google.maps.LatLng(10.991407484983682, 106.65101408958435),
		new google.maps.LatLng(10.98969602611739, 106.65112137794495),
		new google.maps.LatLng(10.987747583938797, 106.65223717689514),
		new google.maps.LatLng(10.987094589627628, 106.65259122848511),
		new google.maps.LatLng(10.98560954879884, 106.65243029594421),
		new google.maps.LatLng(10.984798565901063, 106.65258049964905),
		new google.maps.LatLng(10.983197658056127, 106.65266633033752),
		new google.maps.LatLng(10.981259705365627, 106.65347099304199),
		new google.maps.LatLng(10.9802692, 106.65425030000006),
		new google.maps.LatLng(10.9790268310613, 106.65545046329498),
		new google.maps.LatLng(10.978485899999999, 106.65619479999998),
		new google.maps.LatLng(10.977910387578358, 106.65664672851562),
		new google.maps.LatLng(10.976951928014238, 106.65728509426117),
		new google.maps.LatLng(10.97616725275919, 106.65776252746582),
		new google.maps.LatLng(10.973860611417937, 106.6592001914978),
		new google.maps.LatLng(10.972902138715444, 106.65976881980896),
		new google.maps.LatLng(10.972570358978713, 106.65983855724335),
		new google.maps.LatLng(10.971711943010636, 106.65965616703033),
		new google.maps.LatLng(10.970569139969253, 106.65971517562866),
		new google.maps.LatLng(10.969284139566973, 106.65977954864502),
		new google.maps.LatLng(10.968807529391057, 106.66032135486603),
		new google.maps.LatLng(10.968607405552202, 106.66080683469772),
		new google.maps.LatLng(10.968581073458056, 106.66127890348434),
		new google.maps.LatLng(10.968612671970748, 106.66170537471771),
		new google.maps.LatLng(10.968660069733469, 106.66243761777878),
		new google.maps.LatLng(10.968612671970748, 106.66275411844254),
		new google.maps.LatLng(10.968417814422022, 106.66305720806122),
		new google.maps.LatLng(10.967425092213645, 106.66416764259338),
		new google.maps.LatLng(10.966745720717567, 106.66497230529785),
		new google.maps.LatLng(10.966313871358189, 106.66582524776459),
		new google.maps.LatLng(10.965834623160019, 106.66679084300995),
		new google.maps.LatLng(10.965239511679034, 106.6683304309845),
		new google.maps.LatLng(10.965197379847382, 106.6684752702713),
		new google.maps.LatLng(10.9663253, 106.6689298),
		new google.maps.LatLng(10.970269, 106.67053799999996),
		new google.maps.LatLng(10.972433433899406, 106.67145252227783),
		new google.maps.LatLng(10.97265462053444, 106.67157053947449),
		new google.maps.LatLng(10.973834279791818, 106.67050838470459),
		new google.maps.LatLng(10.975235119042988, 106.66986465454102),
		new google.maps.LatLng(10.975424705799792, 106.66975736618042),
		new google.maps.LatLng(10.9758088, 106.67049629999997)
	];
	
	yellowLinePath = [	
		new google.maps.LatLng(11.05307129393542, 106.66808366775513),
		new google.maps.LatLng(11.052473726246808, 106.66814804077148),
		new google.maps.LatLng(11.051762961331605, 106.66823655366898),
		new google.maps.LatLng(11.051012707608361, 106.6682767868042),
		new google.maps.LatLng(11.050702075680588, 106.66823118925095),
		new google.maps.LatLng(11.050430930593413, 106.66782081127167),
		new google.maps.LatLng(11.050741562808302, 106.66632950305939),
		new google.maps.LatLng(11.050917938580517, 106.66562139987946),
		new google.maps.LatLng(11.051483919820063, 106.66358023881912),
		new google.maps.LatLng(11.051610278273273, 106.66348367929459),
		new google.maps.LatLng(11.051755063934003, 106.66349440813065),
		new google.maps.LatLng(11.05262377639761, 106.66384041309357),
		new google.maps.LatLng(11.053629373672948, 106.66422933340073),
		new google.maps.LatLng(11.054648129700494, 106.66466653347015),
		new google.maps.LatLng(11.054848195067956, 106.66564553976059),
		new google.maps.LatLng(11.055132498250087, 106.66674256324768),
		new google.maps.LatLng(11.055090379277532, 106.66685253381729),
		new google.maps.LatLng(11.054695513615654, 106.66696518659592),
		new google.maps.LatLng(11.054634967500487, 106.6670349240303),
		new google.maps.LatLng(11.054666556779521, 106.66727095842361),
		new google.maps.LatLng(11.054727102888172, 106.66767865419388),
		new google.maps.LatLng(11.054656027020224, 106.66780471801758),
		new google.maps.LatLng(11.054558626728753, 106.66788250207901),
		new google.maps.LatLng(11.053389820708146, 106.66804879903793),
		new google.maps.LatLng(11.053080507524614, 106.66808098554611),
		new google.maps.LatLng(11.053150267547688, 106.6686549782753),
		new google.maps.LatLng(11.052677741783974, 106.66871532797813),
		new google.maps.LatLng(11.052288137796195, 106.66875690221786),
		new google.maps.LatLng(11.051054827166467, 106.66890442371368),
		new google.maps.LatLng(11.04963855370833, 106.66907072067261),
		new google.maps.LatLng(11.048195948436494, 106.66925311088562),
		new google.maps.LatLng(11.047927433533644, 106.66926383972168),
		new google.maps.LatLng(11.048185418444943, 106.6713935136795),
		new google.maps.LatLng(11.049406894945626, 106.67263805866241),
		new google.maps.LatLng(11.0494553, 106.67275319999999),
		new google.maps.LatLng(11.049717528244715, 106.67306184768677),
		new google.maps.LatLng(11.04811697349058, 106.67424738407135),
		new google.maps.LatLng(11.04806169101579, 106.6743278503418),
		new google.maps.LatLng(11.048934363152396, 106.67632207274437),
		new google.maps.LatLng(11.049513510648902, 106.67728900909424),
		new google.maps.LatLng(11.049896537115163, 106.67811244726181),
		new google.maps.LatLng(11.049938656833518, 106.6785791516304),
		new google.maps.LatLng(11.049888639667309, 106.6788849234581),
		new google.maps.LatLng(11.049664878556154, 106.6794428229332),
		new google.maps.LatLng(11.049520091863895, 106.67982369661331),
		new google.maps.LatLng(11.049172603510947, 106.68029844760895),
		new google.maps.LatLng(11.048577660375473, 106.68115675449371),
		new google.maps.LatLng(11.047279837757115, 106.68020188808441),
		new google.maps.LatLng(11.045805630660233, 106.67920410633087),
		new google.maps.LatLng(11.045763510348651, 106.67909950017929),
		new google.maps.LatLng(11.046366356732204, 106.67825996875763),
		new google.maps.LatLng(11.047535190733969, 106.67908877134323),
		new google.maps.LatLng(11.049143646129627, 106.68025553226471),
		new google.maps.LatLng(11.051918276774947, 106.68221890926361),
		new google.maps.LatLng(11.052223642491535, 106.68247103691101),
		new google.maps.LatLng(11.052887022090788, 106.68294847011566),
		new google.maps.LatLng(11.05227365925964, 106.6838201880455),
		new google.maps.LatLng(11.051797183385508, 106.68451488018036),
		new google.maps.LatLng(11.051372368952858, 106.68512240052223),
		new google.maps.LatLng(11.051498069337054, 106.68521761894226),
		new google.maps.LatLng(11.051595799703259, 106.68529003858566),
		new google.maps.LatLng(11.051769542496142, 106.68541140854359),
		new google.maps.LatLng(11.051886029083732, 106.6854938864708),
		new google.maps.LatLng(11.053058131664637, 106.68633610010147),
		new google.maps.LatLng(11.053384555805629, 106.68656408786774),
		new google.maps.LatLng(11.054871887010327, 106.6876745223999),
		new google.maps.LatLng(11.056377637643301, 106.68546438217163),
		new google.maps.LatLng(11.057156834235638, 106.68443977832794),
		new google.maps.LatLng(11.057914969473035, 106.68339371681213),
		new google.maps.LatLng(11.05813082706402, 106.68323814868927),
		new google.maps.LatLng(11.05913114065471, 106.68280363082886),
		new google.maps.LatLng(11.058973196630474, 106.68206870555878),
		new google.maps.LatLng(11.058791560897397, 106.68128550052643),
		new google.maps.LatLng(11.058344052089334, 106.67922288179398),
		new google.maps.LatLng(11.057867586078126, 106.67716026306152),
		new google.maps.LatLng(11.057433237934676, 106.67509496212006),
		new google.maps.LatLng(11.057167363905128, 106.67404890060425),
		new google.maps.LatLng(11.056872533016206, 106.67275607585907),
		new google.maps.LatLng(11.056625085434165, 106.67163491249084),
		new google.maps.LatLng(11.056288135199429, 106.67025089263916),
		new google.maps.LatLng(11.05603542226929, 106.66899025440216),
		new google.maps.LatLng(11.055903800865254, 106.66833579540253),
		new google.maps.LatLng(11.055287811909102, 106.66556775569916),
		new google.maps.LatLng(11.054852143725155, 106.66564285755157),
		new google.maps.LatLng(11.054849511287028, 106.66564352810383)
	];
	
	greenLinePath = [
		new google.maps.LatLng(11.0755935, 106.69248479999999),
		new google.maps.LatLng(11.074867203461464, 106.68984174728394),
		new google.maps.LatLng(11.073645833067697, 106.68493866920471),
		new google.maps.LatLng(11.070781910093771, 106.68552339076996),
		new google.maps.LatLng(11.070723999597634, 106.68555021286011),
		new google.maps.LatLng(11.070523945068333, 106.68424129486084),
		new google.maps.LatLng(11.070250186017292, 106.68330252170563),
		new google.maps.LatLng(11.06959211032838, 106.68040037155151),
		new google.maps.LatLng(11.068802417549765, 106.6771012544632),
		new google.maps.LatLng(11.068191720340964, 106.67446732521057),
		new google.maps.LatLng(11.066980851420421, 106.67466044425964),
		new google.maps.LatLng(11.066170092910713, 106.6748321056366),
		new google.maps.LatLng(11.065501478685293, 106.67499303817749),
		new google.maps.LatLng(11.064659127882686, 106.67520761489868),
		new google.maps.LatLng(11.064095804432144, 106.67515933513641),
		new google.maps.LatLng(11.063458773804726, 106.67496621608734),
		new google.maps.LatLng(11.062853330189306, 106.67483747005463),
		new google.maps.LatLng(11.06262694660311, 106.67480528354645),
		new google.maps.LatLng(11.06183723504963, 106.67498767375946),
		new google.maps.LatLng(11.061084374720648, 106.67511105537415),
		new google.maps.LatLng(11.060378895454464, 106.67527735233307),
		new google.maps.LatLng(11.059504941173047, 106.67549192905426),
		new google.maps.LatLng(11.058978461432652, 106.67561531066895),
		new google.maps.LatLng(11.058183475232834, 106.67577624320984),
		new google.maps.LatLng(11.057599080029025, 106.67589962482452),
		new google.maps.LatLng(11.05829930117095, 106.67903244495392),
		new google.maps.LatLng(11.058773134077613, 106.6812264919281),
		new google.maps.LatLng(11.05911534625611, 106.68274998664856),
		new google.maps.LatLng(11.058309830799423, 106.68306112289429),
		new google.maps.LatLng(11.05763593381504, 106.68367803096771),
		new google.maps.LatLng(11.057183158408675, 106.68436467647552),
		new google.maps.LatLng(11.056493464294801, 106.68523907661438),
		new google.maps.LatLng(11.055340460588408, 106.6870629787445),
		new google.maps.LatLng(11.054940330388645, 106.68766915798187),
		new google.maps.LatLng(11.0560512168338, 106.68852746486664),
		new google.maps.LatLng(11.058346684496076, 106.69017434120178),
		new google.maps.LatLng(11.061779322785295, 106.69262051582336),
		new google.maps.LatLng(11.062137325690633, 106.69289946556091),
		new google.maps.LatLng(11.062347915430662, 106.69397234916687),
		new google.maps.LatLng(11.064738098373303, 106.69329643249512),
		new google.maps.LatLng(11.065948976564105, 106.69313549995422),
		new google.maps.LatLng(11.067633668329881, 106.6926634311676),
		new google.maps.LatLng(11.069781636278408, 106.69227719306946),
		new google.maps.LatLng(11.070508151283896, 106.6920679807663),
		new google.maps.LatLng(11.071234664486921, 106.69192314147949),
		new google.maps.LatLng(11.072440251259408, 106.69164955615997),
		new google.maps.LatLng(11.073272050592637, 106.6914564371109),
		new google.maps.LatLng(11.074230196262596, 106.69120967388153),
		new google.maps.LatLng(11.074719796960204, 106.69111847877502),
		new google.maps.LatLng(11.0747849453784, 106.69108226895332),
		new google.maps.LatLng(11.074970519581056, 106.6910420358181),
		new google.maps.LatLng(11.075132403363884, 106.69100381433964),
		new google.maps.LatLng(11.07518077106211, 106.69099375605583)
	];
	
	pinkLinePath = [
		new google.maps.LatLng(11.058186, 106.68373159999999),
		new google.maps.LatLng(11.058115032611537, 106.68321132659912),
		new google.maps.LatLng(11.059994566483022, 106.68258905410767),
		new google.maps.LatLng(11.061647703960142, 106.68222963809967),
		new google.maps.LatLng(11.063516685737165, 106.68181121349335),
		new google.maps.LatLng(11.065427773086746, 106.68135523796082),
		new google.maps.LatLng(11.069602639551054, 106.68041110038757),
		new google.maps.LatLng(11.069034060985517, 106.6780561208725),
		new google.maps.LatLng(11.068702389645866, 106.67666137218475),
		new google.maps.LatLng(11.070750322551843, 106.6761463880539),
		new google.maps.LatLng(11.071413660216717, 106.675985455513),
		new google.maps.LatLng(11.07215070030411, 106.67583525180817),
		new google.maps.LatLng(11.073524748656201, 106.67551875114441),
		new google.maps.LatLng(11.075735847407731, 106.67500376701355),
		new google.maps.LatLng(11.077094085502186, 106.67470872402191),
		new google.maps.LatLng(11.07766791288055, 106.67457461357117),
		new google.maps.LatLng(11.078852415378227, 106.67429566383362),
		new google.maps.LatLng(11.08117929076723, 106.67377531528473),
		new google.maps.LatLng(11.082995504171867, 106.67336225509644),
		new google.maps.LatLng(11.084348444219334, 106.67305111885071),
		new google.maps.LatLng(11.084864349670864, 106.67530417442322),
		new google.maps.LatLng(11.085253910327108, 106.67714416980743),
		new google.maps.LatLng(11.085601355879993, 106.67868912220001),
		new google.maps.LatLng(11.085848778976596, 106.67986392974854),
		new google.maps.LatLng(11.08610673049272, 106.68115675449371),
		new google.maps.LatLng(11.086296245747308, 106.68190240859985),
		new google.maps.LatLng(11.087035880496352, 106.68173342943192),
		new google.maps.LatLng(11.087957131125922, 106.68151885271072),
		new google.maps.LatLng(11.08877046141189, 106.68133109807968),
		new google.maps.LatLng(11.088975767728348, 106.68128550052643),
		new google.maps.LatLng(11.089391644183916, 106.68118357658386),
		new google.maps.LatLng(11.09034447281983, 106.68097704648972),
		new google.maps.LatLng(11.091007766058677, 106.68081343173981),
		new google.maps.LatLng(11.092063241482162, 106.68058812618256),
		new google.maps.LatLng(11.092173789809728, 106.68056398630142),
		new google.maps.LatLng(11.092152, 106.68048139999996)	
	];
	
	//call a script that create bus route paths	
		var script = document.createElement('script');			
	// for example, arg1 == 'bus_39', show icon of bus_39
	// Loop through the results array and place a marker for each
	// set of coordinates
	// Begin Initializing the Markers, but not display them yet
	// script.src = 'scripts/get_bus39_info.js';
	// initMarkers('39',script);
	// script.src = 'scripts/get_bus55_info.js';
	// initMarkers('55',script);	
	// script.src = 'scripts/get_bus51_info.js';
	// initMarkers('51',script);
	// script.src = 'scripts/get_bus66_info.js';
	// initMarkers('66',script);
	// script.src = 'scripts/get_bus67_info.js';
	// initMarkers('67',script);
	// script.src = 'scripts/get_bus68_info.js';
	// initMarkers('68',script);	
	console.log('bus length: '+bus_markers.length);
	// End Initializing the Markers
	removeMarkers();
	switch (arg) {
		case '39':
			script.src = 'scripts/get_bus39_info.js';
			initMarkers('39',script);
			//remove other markers					
			map.setCenter({lat:11.092152, lng: 106.68048139999996});
			poly.setPath(redLinePath);
			poly.setOptions({strokeColor:'#ff0000'});
			console.log('39 :' + bus39_markers.length);
			// for (i=0; i<bus39_markers.length; i++) {
				// bus39_markers[i].setMap(map);
			// };
			// console.log('39 called: '+bus39_markers.length);			
			break;
		case '55':			
			script.src = 'scripts/get_bus55_info.js';
			initMarkers('55',script);	
			map.setCenter(new google.maps.LatLng(11.054856092382304, 106.66571795940399));
			poly.setPath(brownLinePath);		
			poly.setOptions({strokeColor:'#663300'});
			// for (i=0; i<bus55_markers.length; i++) {
				// bus55_markers[i].setMap(map);
				// // console.log(bus55_markers[i].getPosition().toString());
			// };
			console.log('55 called: '+bus55_markers.length);			
			break;
		case '51':
			script.src = 'scripts/get_bus55_info.js';
			initMarkers('55',script);
		case '52':
			script.src = 'scripts/get_bus52_info.js';
			initMarkers('52',script);
		case '53':
			script.src = 'scripts/get_bus53_info.js';
			initMarkers('53',script);			
			map.setCenter(new google.maps.LatLng(11.054856092382304, 106.66571795940399));
			poly.setPath(blueLinePath);
			poly.setOptions({strokeColor:'#0000ff'});
			console.log('53 :' + bus53_markers.length);
			break;
		case '66':
			map.setCenter(new google.maps.LatLng(11.05307129393542, 106.66808366775513));
			poly.setPath(yellowLinePath);
			poly.setOptions({strokeColor:'#ffff00'});
			script.src = 'scripts/get_bus66_info.js';
			initMarkers('66',script);
			break;
		case '67':
			map.setCenter(new google.maps.LatLng(11.0755935, 106.69248479999999));
			// while(markersArray.length) { markersArray.pop().setMap(null); }
			poly.setPath(greenLinePath);
			poly.setOptions({strokeColor:'#008000'});
			script.src = 'scripts/get_bus67_info.js';
			initMarkers('67',script);
			break;
		case '68':
			map.setCenter(new google.maps.LatLng(11.058186, 106.68373159999999));
			poly.setPath(pinkLinePath);
			poly.setOptions({strokeColor:'#ffc0cb'});
			script.src = 'scripts/get_bus68_info.js';
			initMarkers('68',script);
			break;
	}		
	
	// If rightclick on the map, a popup wil be shown and user can save a recent drawn bus route path
	// google.maps.event.addListener(map, "rightclick", function(event) {
		// download('bus_data.txt', path.getArray());			
	// });	
};
function initMarkers(busNumber,script) {	
	document.getElementsByTagName('head')[0].appendChild(script);
	var marker_map;		
	window.eqfeed_callback = function(results) {		
	for (var i = 0; i < results.features.length; i++) {					
		var coords = results.features[i].geometry.coordinates;
		// var image = 'images/bus_stop_icon.png';
		var image = 'images/bus-station.png';
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		var marker = new google.maps.Marker({
			scaledSize: new google.maps.Size(32, 32), // scaled size
			position: latLng,
			// map: map,
			icon : image,
			clickable: true
		});
		switch (busNumber) {
			case '39':
				bus39_markers.push(marker);		
				break;
			case '55':
				bus55_markers.push(marker);
				break;
			case '51':
				bus51_markers.push(marker);
				break;
			case '52':
				bus52_markers.push(marker);
				break;
			case '53':
				bus53_markers.push(marker);
				break;
			case '66':
				bus66_markers.push(marker);
				break;
			case '67':
				bus67_markers.push(marker);
				break;
			case '68':
				bus68_markers.push(marker);
				break;
		};
		// end switch statement
		
		marker.info = new google.maps.InfoWindow({
		  content: "Trạm dừng: " + results.features[i].properties.name + 
					"<br>Các tuyến: "+ results.features[i].properties.bus_routes		 
		});
		
		google.maps.event.addListener(marker, 'click', function(event) {				
			marker_map = this.getMap();
			this.info.open(marker_map,this);
			var data = '{lat: '+event.latLng.lat()+', lng: '+event.latLng.lng()+'}';
			// Comment because only need when drawing
			// var path = poly.getPath();
			// path.push(event.latLng);				
		});
	}
	//end for loop 
	
	}
	// end eqfeed_callback function
}


// function download(filename, text) {
    // var pom = document.createElement('a');
    // pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    // pom.setAttribute('download', filename);

    // if (document.createEvent) {
        // var event = document.createEvent('MouseEvents');
        // event.initEvent('click', true, true);
        // pom.dispatchEvent(event);
    // }
    // else {
        // pom.click();
    // }
// }

function removeMarkers() {	
	for (i=0; i<bus39_markers.length; i++) {
		bus39_markers[i].setMap(null);
	}
	for (i=0; i<bus55_markers.length; i++) {
		bus55_markers[i].setMap(null);
	}
	for (i=0; i<bus51_markers.length; i++) {
		bus51_markers[i].setMap(null);
	}
	for (i=0; i<bus52_markers.length; i++) {
		bus55_markers[i].setMap(null);
	}
	for (i=0; i<bus53_markers.length; i++) {
		bus53_markers[i].setMap(null);
	}
	for (i=0; i<bus66_markers.length; i++) {
		bus66_markers[i].setMap(null);
	}
	for (i=0; i<bus67_markers.length; i++) {
		bus67_markers[i].setMap(null);
	}
	for (i=0; i<bus68_markers.length; i++) {
		bus68_markers[i].setMap(null);
	}
};

